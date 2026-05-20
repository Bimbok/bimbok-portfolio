import { getSession } from "@/lib/auth";
import { getPhotosAction } from "@/actions/photos";
import { getPostsAction } from "@/actions/posts";
import { getResumesAction } from "@/actions/resumes";
import PostsClient from "@/components/posts/posts-client";

export const metadata = {
  title: "Bimbok's Chronicles & Snapshots | Bratik Mukherjee",
  description: "Explore the visual journey and personal chronicles of Bratik Mukherjee (Bimbok). Featuring professional photography, life snapshots, and stories lived.",
  keywords: ["Bimbok", "Bratik Mukherjee", "Bimbok Photos", "Bratik Mukherjee Gallery", "Full Stack Developer", "Personal Blog"],
};

export default async function PostsPage() {
  const session = await getSession();
  const isAdmin = !!session;
  
  const [photos, posts, resumes] = await Promise.all([
    getPhotosAction(),
    getPostsAction(),
    getResumesAction(),
  ]);

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <PostsClient 
        initialPhotos={photos} 
        initialPosts={posts} 
        initialResumes={resumes}
        isAdmin={isAdmin} 
      />
    </main>
  );
}
