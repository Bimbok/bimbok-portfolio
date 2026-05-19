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
      <div className="flex flex-col items-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
        >
          Chronicles & Snapshots
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl"
        >
          A collection of thoughts, stories, and moments captured through my lens.
        </motion.p>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="blogs">Chronicles</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="gallery">
          <CircularGallery photos={photos} />
        </TabsContent>
        <TabsContent value="blogs">
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
        <div className="fixed bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsLoginOpen(true)}
            className="w-8 h-8 rounded-full"
          >
            <Lock className="w-3 h-3 text-muted-foreground" />
          </Button>
        </div>
      )}

      <AdminLoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}
