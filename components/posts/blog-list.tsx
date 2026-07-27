"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Clock, X } from "lucide-react";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChronicleReader from "./chronicle-reader";

interface BlogListProps {
  posts: any[];
}

function getCleanPreview(content: string) {
  if (!content) return "";
  return content
    .replace(/```[\s\S]*?```/g, "[Code Snippet]")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*#_>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-[2rem] bg-muted/30 backdrop-blur-md">
        <p className="text-xl font-light">The chronicles haven't begun yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12">
      {/* Structured Data for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Bimbok's Chronicles",
            "author": {
              "@type": "Person",
              "name": "Bratik Mukherjee",
              "alternateName": "Bimbok"
            },
            "blogPost": posts.map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.createdAt,
              "author": {
                "@type": "Person",
                "name": "Bratik Mukherjee",
                "alternateName": "Bimbok"
              },
              "description": getCleanPreview(post.content).substring(0, 160)
            }))
          })
        }}
      />
      {posts.map((post, index) => (
        <motion.div
          key={post._id || post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="group relative overflow-hidden bg-secondary/20 backdrop-blur-xl border border-border hover:border-primary/40 transition-all duration-500 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl">
            <div className="p-6 md:p-12">
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 font-light tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 md:w-4 h-4 text-primary" />
                  {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 md:w-4 h-4 text-primary" />
                  {Math.ceil(post.content.split(' ').length / 200)} min read
                </div>
              </div>
              
              <CardTitle className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tighter group-hover:text-primary transition-colors duration-500">
                {post.title}
              </CardTitle>
              
              <CardContent className="p-0">
                <p className="text-muted-foreground text-base md:text-xl line-clamp-3 mb-8 md:mb-10 leading-relaxed font-light">
                  {getCleanPreview(post.content)}
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="inline-flex items-center gap-3 text-primary font-bold text-base md:text-lg cursor-pointer group/link tracking-tight"
                    >
                      READ STORY
                      <div className="w-8 md:w-12 h-[2px] bg-primary/30 group-hover/link:w-16 transition-all duration-500" />
                      <ArrowRight className="w-4 h-4 md:w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-background/90 backdrop-blur-3xl border border-border rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
                    <ScrollArea className="h-full max-h-[90vh]">
                      <div className="p-6 sm:p-10 md:p-16">
                        <DialogHeader className="mb-8 md:mb-12">
                          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6 font-light tracking-widest uppercase">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              {format(new Date(post.createdAt), "MMMM dd, yyyy")}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              {Math.ceil(post.content.split(' ').length / 200)} min read
                            </div>
                          </div>
                          <DialogTitle className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tighter text-foreground mb-4">
                            {post.title}
                          </DialogTitle>
                          <DialogDescription className="sr-only">
                            Read the full chronicle: {post.title}
                          </DialogDescription>
                          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                        </DialogHeader>
                        
                        <ChronicleReader content={post.content} title={post.title} />

                        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                          <div className="text-sm font-bold tracking-widest text-primary uppercase">
                            End of Chronicle
                          </div>
                          <div className="text-muted-foreground font-light italic">
                            — Bratik Mukherjee
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </div>
            
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Premium corner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
