"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Loader2,
  Pencil
} from "lucide-react";
import { deleteResumeAction, setActiveResumeAction, updateResumeAction } from "@/actions/resumes";
import { toast } from "sonner";

interface ResumeListProps {
  resumes: any[];
  isAdmin: boolean;
  onUpdate: (newResumes: any[]) => void;
}

/**
 * Converts a Google Drive share link to a preview/embed link.
 */
function getGDrivePreviewUrl(url: string) {
  try {
    // Handle standard view links
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  } catch {
    return url;
  }
}

export default function ResumeList({ resumes, isAdmin, onUpdate }: ResumeListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingResume, setEditingResume] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const activeResume = resumes.find(r => r.isActive);
  const displayResumes = isAdmin ? resumes : (activeResume ? [activeResume] : []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this resume link?")) return;
    
    setLoadingId(id);
    const result = await deleteResumeAction(id);
    setLoadingId(null);
    
    if (result.success) {
      toast.success("Resume link removed");
      onUpdate(resumes.filter(r => (r._id || r.id) !== id));
    } else {
      toast.error(result.error);
    }
  }

  async function handleSetActive(id: string) {
    setLoadingId(id);
    const result = await setActiveResumeAction(id);
    setLoadingId(null);
    
    if (result.success) {
      toast.success("Active resume updated");
      onUpdate(resumes.map(r => ({
        ...r,
        isActive: (r._id || r.id) === id
      })));
    } else {
      toast.error(result.error);
    }
  }

  function handleStartEdit(resume: any) {
    setEditingResume(resume);
    setEditName(resume.name || "");
    setEditUrl(resume.url || "");
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingResume) return;

    setIsUpdating(true);
    const resId = editingResume._id || editingResume.id;
    const result = await updateResumeAction(resId, editName, editUrl);
    setIsUpdating(false);

    if (result.success && result.resume) {
      toast.success("Resume updated successfully");
      onUpdate(resumes.map(r => ((r._id || r.id) === resId ? result.resume : r)));
      setEditingResume(null);
    } else {
      toast.error(result.error || "Failed to update resume");
    }
  }

  if (displayResumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-[2rem] bg-muted/30 backdrop-blur-md">
        <p className="text-xl font-light">No resumes available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 space-y-8">
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <motion.div
              key={resume._id || resume.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className={`relative overflow-hidden bg-secondary/20 backdrop-blur-xl border-2 transition-all duration-500 rounded-[1.5rem] ${
                resume.isActive ? "border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]" : "border-border"
              }`}>
                <CardContent className="p-3.5 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                      <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${resume.isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base sm:text-lg truncate">{resume.name}</h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                          {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSetActive(resume._id || resume.id)}
                        disabled={loadingId === (resume._id || resume.id) || resume.isActive}
                        className={`h-8.5 w-8.5 sm:h-10 sm:w-10 ${resume.isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                        title="Set Active"
                      >
                        {resume.isActive ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Circle className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8.5 w-8.5 sm:h-10 sm:w-10 text-muted-foreground hover:text-primary"
                        onClick={() => handleStartEdit(resume)}
                        disabled={loadingId === (resume._id || resume.id)}
                        title="Edit Resume Title & Link"
                      >
                        <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8.5 w-8.5 sm:h-10 sm:w-10"
                        asChild
                        title="Download Resume"
                      >
                        <a href={resume.url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8.5 w-8.5 sm:h-10 sm:w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(resume._id || resume.id)}
                        disabled={loadingId === (resume._id || resume.id)}
                        title="Delete Resume"
                      >
                        {loadingId === (resume._id || resume.id) ? (
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Primary View (Active resume for all viewers) */}
      <AnimatePresence mode="wait">
        {activeResume && (
          <div className="space-y-4">
            {!isAdmin && (
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-base sm:text-lg text-foreground flex items-center gap-2 truncate pr-4">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <span className="truncate">{activeResume.name}</span>
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-2 font-bold text-xs bg-secondary/30 backdrop-blur-md border-border hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
                  asChild
                >
                  <a href={activeResume.url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            )}

            <motion.div
              key="active-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-[80vh] bg-secondary/10 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden relative shadow-2xl"
            >
              <iframe
                src={getGDrivePreviewUrl(activeResume.url)}
                className="w-full h-full border-none"
                title="Resume Preview"
                allow="autoplay"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Resume Modal */}
      <Dialog open={!!editingResume} onOpenChange={(open) => !open && setEditingResume(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-3xl border-border rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black text-foreground">Edit Resume</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm font-light">
              Update title or Google Drive share link for this resume.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-xs font-semibold text-foreground/80 ml-1">
                Resume Title
              </Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="e.g. resume-v4-fullstack.pdf"
                required
                className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary px-4 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-url" className="text-xs font-semibold text-foreground/80 ml-1">
                Google Drive Share Link / URL
              </Label>
              <Input
                id="edit-url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                required
                className="bg-secondary/20 border-border text-foreground h-12 rounded-xl focus:ring-primary focus:border-primary px-4 text-sm"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditingResume(null)}
                disabled={isUpdating}
                className="rounded-xl h-11 px-5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-xl h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

