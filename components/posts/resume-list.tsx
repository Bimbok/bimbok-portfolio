"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Loader2
} from "lucide-react";
import { deleteResumeAction, setActiveResumeAction } from "@/actions/resumes";
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

      {/* Primary View (Active for viewers, focus for admin) */}
      <AnimatePresence mode="wait">
        {activeResume && (
          <motion.div
            key="active-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-[80vh] bg-secondary/10 backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden relative"
          >
            {/* Protective Overlay to discourage download (doesn't prevent savvy users) */}
            {!isAdmin && (
              <div 
                className="absolute inset-0 z-10 pointer-events-none select-none" 
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
            
            <iframe
              src={getGDrivePreviewUrl(activeResume.url)}
              className="w-full h-full border-none"
              title="Resume Preview"
              onContextMenu={(e) => e.preventDefault()}
              allow="autoplay"
            />
            
            {!isAdmin && (
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white/60 uppercase tracking-widest font-black">
                  Protected View
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
