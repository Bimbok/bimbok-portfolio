"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, FileText, LogOut, Loader2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadPhotoAction } from "@/actions/photos";
import { createPostAction } from "@/actions/posts";
import { logoutAction } from "@/actions/auth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AdminControlsProps {
  isAdmin: boolean;
  onPhotoUpload: (photo: any) => void;
  onPostCreate: (post: any) => void;
}

export default function AdminControls({ isAdmin, onPhotoUpload, onPostCreate }: AdminControlsProps) {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdmin) return null;

  async function handlePhotoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await uploadPhotoAction(formData);
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Photo uploaded successfully!");
      onPhotoUpload(result.photo);
      setIsPhotoDialogOpen(false);
    } else {
      toast.error(result.error || "Upload failed");
    }
  }

  async function handlePostSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createPostAction(formData);
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Chronicle published!");
      onPostCreate(result.post);
      setIsPostDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to publish");
    }
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <Button 
          onClick={() => setIsPhotoDialogOpen(true)}
          className="rounded-full w-14 h-14 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:scale-110 active:scale-95 transition-all duration-300 bg-primary hover:bg-primary/90 text-white border-none"
        >
          <ImageIcon className="w-6 h-6" />
        </Button>
        <Button 
          onClick={() => setIsPostDialogOpen(true)}
          className="rounded-full w-14 h-14 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-110 active:scale-95 transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white"
        >
          <FileText className="w-6 h-6" />
        </Button>
        <Button 
          onClick={() => logoutAction()}
          variant="destructive"
          size="icon"
          className="rounded-full w-10 h-10 shadow-lg self-center hover:rotate-12 transition-transform"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Photo Upload Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-slate-950/80 backdrop-blur-2xl border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black tracking-tighter text-white">Capture a Moment</DialogTitle>
            <DialogDescription className="text-slate-400 font-light">Upload a new photo to your gallery.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhotoSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-sm font-medium text-slate-300 ml-1">Image File</Label>
              <div className="relative group">
                <Input 
                  id="file" 
                  name="file" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80 transition-all cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-slate-300 ml-1">Description</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="A brief cinematic caption..." 
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary focus:border-primary placeholder:text-slate-600"
              />
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? "Uploading..." : "Publish to Gallery"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Post Creation Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-slate-950/80 backdrop-blur-2xl border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-4xl font-black tracking-tighter text-white">Write a Chronicle</DialogTitle>
            <DialogDescription className="text-slate-400 font-light text-lg">Share your journey and thoughts with the world.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePostSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-medium text-slate-300 ml-1">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="The story begins with..." 
                required 
                className="bg-white/5 border-white/10 text-white h-16 rounded-2xl text-xl font-bold focus:ring-primary focus:border-primary placeholder:text-slate-700 px-6"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="content" className="text-base font-medium text-slate-300 ml-1">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="Dive into the details..." 
                className="min-h-[300px] bg-white/5 border-white/10 text-white rounded-2xl p-6 text-lg font-light leading-relaxed focus:ring-primary focus:border-primary placeholder:text-slate-700 resize-none"
                required 
              />
            </div>
            <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl tracking-tight shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : null}
              {isLoading ? "Publishing..." : "Publish Chronicle"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
