"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";

interface BlogListProps {
  posts: any[];
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
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
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
              "description": post.content.substring(0, 160)
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
          <Card className="group relative overflow-hidden bg-secondary/20 backdrop-blur-xl border border-border hover:border-primary/40 transition-all duration-500 rounded-[2.5rem] shadow-2xl">
            <div className="p-8 md:p-12">
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
              
              <CardTitle className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tighter group-hover:text-primary transition-colors duration-500">
                {post.title}
              </CardTitle>
              
              <CardContent className="p-0">
                <p className="text-muted-foreground text-lg md:text-xl line-clamp-3 mb-10 leading-relaxed font-light">
                  {post.content}
                </p>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-3 text-primary font-bold text-lg cursor-pointer group/link tracking-tight"
                >
                  READ STORY
                  <div className="w-12 h-[2px] bg-primary/30 group-hover/link:w-16 transition-all duration-500" />
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                </motion.div>
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
