"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircularGallery from "./circular-gallery";
import BlogList from "./blog-list";
import ResumeList from "./resume-list";
import AdminControls from "./admin-controls";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import AdminLoginDialog from "./admin-login-dialog";

interface PostsClientProps {
  initialPhotos: any[];
  initialPosts: any[];
  initialResumes: any[];
  isAdmin: boolean;
}

export default function PostsClient({ initialPhotos, initialPosts, initialResumes, isAdmin }: PostsClientProps) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [posts, setPosts] = useState(initialPosts);
  const [resumes, setResumes] = useState(initialResumes);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="flex flex-col items-center mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-6 text-center tracking-tighter leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-purple-500 dark:to-purple-400">
              CHRONICLES
            </span>
            <br />
            <span className="text-foreground/40 dark:text-white/20 text-3xl sm:text-5xl md:text-7xl">& SNAPSHOTS</span>
          </h1>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[60px] md:blur-[100px] rounded-full opacity-50" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-muted-foreground text-center max-w-2xl text-base sm:text-lg font-light tracking-wide px-4"
        >
          A cinematic journey through moments captured and stories lived.
        </motion.p>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <div className="flex justify-center mb-10 md:mb-16 px-4">
          <TabsList className="h-12 md:h-14 p-1 bg-muted/50 backdrop-blur-2xl border border-border rounded-full w-full max-w-[480px]">
            <TabsTrigger 
              value="gallery" 
              className="rounded-full h-full text-sm md:text-base font-medium transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground shadow-sm"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="rounded-full h-full text-sm md:text-base font-medium transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground shadow-sm"
            >
              Chronicles
            </TabsTrigger>
            <TabsTrigger 
              value="resume" 
              className="rounded-full h-full text-sm md:text-base font-medium transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-foreground shadow-sm"
            >
              Resume
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
        <TabsContent value="resume" className="mt-0 outline-none">
          <ResumeList 
            resumes={resumes} 
            isAdmin={isAdmin} 
            onUpdate={setResumes}
          />
        </TabsContent>
      </Tabs>

      {/* Admin Section */}
      <AdminControls 
        isAdmin={isAdmin} 
        onPhotoUpload={(newPhoto) => setPhotos([newPhoto, ...photos])}
        onPostCreate={(newPost) => setPosts([newPost, ...posts])}
        onResumeUpload={(newResume) => setResumes([newResume, ...resumes])}
      />

      {/* Hidden Admin Trigger */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 opacity-0 hover:opacity-100 transition-all duration-700">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsLoginOpen(true)}
            className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border hover:bg-accent hover:text-accent-foreground"
          >
            <Lock className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      )}

      <AdminLoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}
