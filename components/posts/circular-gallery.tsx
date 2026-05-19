"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

interface CircularGalleryProps {
  photos: any[];
}

export default function CircularGallery({ photos }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl">
        <p>No snapshots captured yet.</p>
      </div>
    );
  }

  return (
    <div className="relative py-12 px-4" ref={containerRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo._id || photo.id}
            initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 10,
              rotate: index % 2 === 0 ? 2 : -2
            }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-muted border-none ring-1 ring-white/10 shadow-2xl">
                  <Image
                    src={photo.url}
                    alt={photo.description || "Portfolio Photo"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {photo.description}
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                <div className="sr-only">
                  <DialogTitle>{photo.description || "Photo Preview"}</DialogTitle>
                </div>
                <div className="relative aspect-video md:aspect-auto md:h-[80vh] w-full">
                  <Image
                    src={photo.url}
                    alt={photo.description || "Portfolio Photo"}
                    fill
                    className="object-contain"
                  />
                </div>
                {photo.description && (
                  <div className="p-6 bg-background/80 backdrop-blur-md absolute bottom-0 left-0 right-0">
                    <p className="text-lg font-medium">{photo.description}</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
