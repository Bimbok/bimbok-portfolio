"use server";

import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const ORIGINAL_ALGOSCOPE_MARKDOWN = `> "What if algorithms could actually feel understandable instead of just memorized?"

So we started building.

At first, it was just a small visualization project — a few sorting animations, some graph traversals, and lots of late-night debugging sessions. But slowly, AlgoScope became much more than that.

We kept improving:

- cleaner animations
- synchronized code highlighting
- interactive practice environment
- protected coding workspace
- optimized architecture
- better search and scalability
- open-source community contributions`;

export async function createPostAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { success: false, error: "Title and content are required" };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    await dbConnect();
    const post = await Post.create({
      title,
      content,
      slug,
    });

    revalidatePath("/posts");
    return { success: true, post: JSON.parse(JSON.stringify(post)) };
  } catch (error: any) {
    console.error("Post creation error:", error);
    return { success: false, error: error.message || "Failed to create post" };
  }
}

export async function getPostsAction() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 });

    if (posts && posts.length > 0) {
      for (const post of posts) {
        if (post.title.includes("AlgoScope")) {
          post.content = ORIGINAL_ALGOSCOPE_MARKDOWN;
          await post.save();
        }
      }
      return JSON.parse(JSON.stringify(posts));
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return [
    {
      _id: "default-algoscope-post",
      title: "There was never a perfect plan behind AlgoScope.",
      createdAt: new Date().toISOString(),
      content: ORIGINAL_ALGOSCOPE_MARKDOWN,
    }
  ];
}

export async function deletePostAction(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await dbConnect();
    await Post.findByIdAndDelete(id);
    revalidatePath("/posts");
    return { success: true };
  } catch (error: any) {
    console.error("Post deletion error:", error);
    return { success: false, error: error.message || "Failed to delete post" };
  }
}
