"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, FileText, LogOut, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadPhotoAction } from "@/actions/photos";
import { createPostAction } from "@/actions/posts";
import { logoutAction } from "@/actions/auth";
import { toast } from "sonner";

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
      <Button 
        onClick={() => setIsPhotoDialogOpen(true)}
        className="rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform"
      >
        <ImageIcon className="w-6 h-6" />
      </Button>
      <Button 
        onClick={() => setIsPostDialogOpen(true)}
        variant="secondary"
        className="rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-transform"
      >
        <FileText className="w-6 h-6" />
      </Button>
      <Button 
        onClick={() => logoutAction()}
        variant="destructive"
        size="icon"
        className="rounded-full w-10 h-10 shadow-lg self-center"
      >
        <LogOut className="w-4 h-4" />
      </Button>

      {/* Photo Upload Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Capture a Moment</DialogTitle>
            <DialogDescription>Upload a new photo to your gallery.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePhotoSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Image File</Label>
              <Input id="file" name="file" type="file" accept="image/*" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" placeholder="A brief caption..." />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isLoading ? "Uploading..." : "Upload Photo"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Post Creation Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Write a Chronicle</DialogTitle>
            <DialogDescription>Share your thoughts with the world.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePostSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Entry Title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="What's on your mind?" 
                className="min-h-[200px]"
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isLoading ? "Publishing..." : "Publish Chronicle"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
