"use server";

import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}
