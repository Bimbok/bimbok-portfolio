"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface BlogListProps {
  posts: any[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
        <p>The chronicles haven't begun yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      {posts.map((post, index) => (
        <motion.div
          key={post._id || post.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group overflow-hidden bg-background/40 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-colors shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.createdAt), "MMMM dd, yyyy")}
              </div>
              <CardTitle className="text-2xl md:text-3xl group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center gap-2 text-primary font-medium cursor-pointer group/link">
                Read Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </div>
            </CardContent>
            
            {/* Animated hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
