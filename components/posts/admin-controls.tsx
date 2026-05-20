"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, FileText, LogOut, Loader2, X, FileUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadPhotoAction } from "@/actions/photos";
import { createPostAction } from "@/actions/posts";
import { addResumeAction } from "@/actions/resumes";
import { logoutAction } from "@/actions/auth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AdminControlsProps {
  isAdmin: boolean;
  onPhotoUpload: (photo: any) => void;
  onPostCreate: (post: any) => void;
  onResumeUpload: (resume: any) => void;
}

export default function AdminControls({ isAdmin, onPhotoUpload, onPostCreate, onResumeUpload }: AdminControlsProps) {
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
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

  async function handleResumeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await addResumeAction(formData);
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Resume link added!");
      onResumeUpload(result.resume);
      setIsResumeDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to add link");
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
          className="rounded-full w-14 h-14 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] hover:scale-110 active:scale-95 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground border-none"
        >
          <ImageIcon className="w-6 h-6" />
        </Button>
        <Button 
          onClick={() => setIsPostDialogOpen(true)}
          className="rounded-full w-14 h-14 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] hover:scale-110 active:scale-95 transition-all duration-300 bg-secondary/80 backdrop-blur-xl border border-border hover:bg-secondary text-foreground"
        >
          <FileText className="w-6 h-6" />
        </Button>
        <Button 
          onClick={() => setIsResumeDialogOpen(true)}
          className="rounded-full w-14 h-14 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] hover:scale-110 active:scale-95 transition-all duration-300 bg-secondary/80 backdrop-blur-xl border border-border hover:bg-secondary text-foreground"
        >
          <FileUp className="w-6 h-6" />
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
        <DialogContent className="sm:max-w-[450px] bg-background/80 backdrop-blur-2xl border-border rounded-[2rem] p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Capture a Moment</DialogTitle>
            <DialogDescription className="text-muted-foreground font-light">Upload a new photo to your gallery.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhotoSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-sm font-medium text-foreground/80 ml-1">Image File</Label>
              <div className="relative group">
                <Input 
                  id="file" 
                  name="file" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80 transition-all cursor-pointer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground/80 ml-1">Description</Label>
              <Input 
                id="description" 
                name="description" 
                placeholder="A brief cinematic caption..." 
                className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary placeholder:text-muted-foreground/50"
              />
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? "Uploading..." : "Publish to Gallery"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Post Creation Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-background/80 backdrop-blur-2xl border-border rounded-[2.5rem] p-10 shadow-2xl">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-4xl font-black tracking-tighter text-foreground">Write a Chronicle</DialogTitle>
            <DialogDescription className="text-muted-foreground font-light text-lg">Share your journey and thoughts with the world.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePostSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-medium text-foreground/80 ml-1">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="The story begins with..." 
                required 
                className="bg-secondary/20 border-border text-foreground h-16 rounded-2xl text-xl font-bold focus:ring-primary focus:border-primary placeholder:text-muted-foreground/30 px-6"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="content" className="text-base font-medium text-foreground/80 ml-1">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="Dive into the details..." 
                className="min-h-[300px] bg-secondary/20 border-border text-foreground rounded-2xl p-6 text-lg font-light leading-relaxed focus:ring-primary focus:border-primary placeholder:text-muted-foreground/30 resize-none"
                required 
              />
            </div>
            <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl tracking-tight shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-2" /> : null}
              {isLoading ? "Publishing..." : "Publish Chronicle"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Resume Link Dialog */}
      <Dialog open={isResumeDialogOpen} onOpenChange={setIsResumeDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-background/80 backdrop-blur-2xl border-border rounded-[2rem] p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Add Resume Link</DialogTitle>
            <DialogDescription className="text-muted-foreground font-light">Paste a public Google Drive share link for your resume.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResumeSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume-url" className="text-sm font-medium text-foreground/80 ml-1">Google Drive Link</Label>
              <Input 
                id="resume-url" 
                name="url" 
                type="url" 
                placeholder="https://drive.google.com/file/d/.../view" 
                required 
                className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary placeholder:text-muted-foreground/30 px-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume-name" className="text-sm font-medium text-foreground/80 ml-1">Version Name</Label>
              <Input 
                id="resume-name" 
                name="name" 
                placeholder="e.g., Software Engineer - May 2026" 
                required
                className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary placeholder:text-muted-foreground/50 px-4"
              />
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? "Adding..." : "Add Resume"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
