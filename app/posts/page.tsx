import { getSession } from "@/lib/auth";
import { getPhotosAction } from "@/actions/photos";
import { getPostsAction } from "@/actions/posts";
import PostsClient from "@/components/posts/posts-client";

export const metadata = {
  title: "Posts & Gallery | Bratik Mukherjee",
  description: "Chronicles and snapshots from my journey.",
};

export default async function PostsPage() {
  const session = await getSession();
  const isAdmin = !!session;
  
  const [photos, posts] = await Promise.all([
    getPhotosAction(),
    getPostsAction(),
  ]);

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <PostsClient 
        initialPhotos={photos} 
        initialPosts={posts} 
        isAdmin={isAdmin} 
      />
    </main>
  );
}
