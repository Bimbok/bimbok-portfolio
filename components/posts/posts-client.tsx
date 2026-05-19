"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircularGallery from "./circular-gallery";
import BlogList from "./blog-list";
import AdminControls from "./admin-controls";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import AdminLoginDialog from "./admin-login-dialog";

interface PostsClientProps {
  initialPhotos: any[];
  initialPosts: any[];
  isAdmin: boolean;
}

export default function PostsClient({ initialPhotos, initialPosts, isAdmin }: PostsClientProps) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [posts, setPosts] = useState(initialPosts);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-center tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-purple-400">
              CHRONICLES
            </span>
            <br />
            <span className="text-white/20">& SNAPSHOTS</span>
          </h1>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] rounded-full opacity-50" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-muted-foreground text-center max-w-2xl text-lg font-light tracking-wide"
        >
          A cinematic journey through moments captured and stories lived.
        </motion.p>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <div className="flex justify-center mb-16">
          <TabsList className="h-14 p-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full w-full max-w-[400px]">
            <TabsTrigger 
              value="gallery" 
              className="rounded-full h-full text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-500"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="rounded-full h-full text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-500"
            >
              Chronicles
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="gallery" className="mt-0 outline-none">
          <CircularGallery 
            photos={photos} 
            bend={1}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </TabsContent>
        <TabsContent value="blogs" className="mt-0 outline-none">
          <BlogList posts={posts} />
        </TabsContent>
      </Tabs>

      {/* Admin Section */}
      <AdminControls 
        isAdmin={isAdmin} 
        onPhotoUpload={(newPhoto) => setPhotos([newPhoto, ...photos])}
        onPostCreate={(newPost) => setPosts([newPost, ...posts])}
      />

      {/* Hidden Admin Trigger */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 opacity-0 hover:opacity-100 transition-all duration-700">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsLoginOpen(true)}
            className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
          >
            <Lock className="w-4 h-4 text-white/40" />
          </Button>
        </div>
      )}

      <AdminLoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}
