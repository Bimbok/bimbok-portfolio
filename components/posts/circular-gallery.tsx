"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { deletePhotoAction } from "@/actions/photos";
import { toast } from "sonner";

interface CircularGalleryProps {
  photos: any[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  isAdmin?: boolean;
  onDelete?: (photoId: string) => void;
}

export default function CircularGallery({
  photos,
  bend = 1,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  isAdmin = false,
  onDelete,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  if (photos.length === 0) {
    return (
      <div 
        ref={containerRef}
        className="relative flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-[2rem] bg-muted/30 backdrop-blur-md"
      >
        <p className="text-xl font-light">The gallery is waiting for its first snapshot.</p>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-24 overflow-hidden" ref={containerRef}>
      {/* Structured Data for Google Image Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            "itemListElement": photos.map((photo, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "ImageObject",
                "url": photo.url,
                "name": photo.description || `Photo by Bimbok (Bratik Mukherjee) - ${index + 1}`,
                "author": {
                  "@type": "Person",
                  "name": "Bratik Mukherjee",
                  "alternateName": "Bimbok"
                },
                "contentUrl": photo.url,
                "description": photo.description || "Portfolio photograph by Bratik Mukherjee"
              }
            }))
          })
        }}
      />
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4 max-w-7xl mx-auto">
        {photos.map((photo, index) => {
          const rotationBase = (index % 3 - 1) * 5 * bend;
          
          return (
            <GalleryItem 
              key={photo._id || photo.id} 
              photo={photo} 
              index={index} 
              bend={bend}
              borderRadius={borderRadius}
              rotationBase={rotationBase}
              velocityFactor={velocityFactor}
              isAdmin={isAdmin}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      
      {/* Premium background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
    </div>
  );
}

function GalleryItem({ photo, index, bend, borderRadius, rotationBase, velocityFactor, isAdmin, onDelete }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  async function handleDeletePhoto(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this photo from Cloudinary and database?")) return;

    setIsDeleting(true);
    const photoId = photo._id || photo.id;
    const result = await deletePhotoAction(photoId);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Photo removed from Cloudinary & database");
      if (onDelete) onDelete(photoId);
    } else {
      toast.error(result.error || "Failed to delete photo");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="perspective-1000 relative group/wrapper"
    >
      {/* Admin Delete Button */}
      {isAdmin && (
        <button
          type="button"
          onClick={handleDeletePhoto}
          disabled={isDeleting}
          className="absolute -top-2 -right-2 z-40 p-2.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 border border-white/20"
          title="Delete Photo from Cloudinary & Database"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX, 
              rotateY,
              rotateZ: rotationBase,
            }}
            whileHover={{ scale: 1.05, rotateZ: 0, z: 50 }}
            className="group relative w-[calc(100vw-3rem)] sm:w-64 h-[calc(1.25*(100vw-3rem))] sm:h-80 cursor-pointer max-w-[320px] max-h-[400px]"
          >
            <div 
              className="absolute inset-0 bg-secondary/20 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-primary/20"
              style={{ borderRadius: `${borderRadius * 1000}px` }}
            >
              <Image
                src={photo.url}
                alt={photo.description || "Portfolio Photo"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 320px, 256px"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="text-white text-sm font-light tracking-wide leading-relaxed line-clamp-2 sm:line-clamp-none"
                >
                  {photo.description}
                </motion.p>
              </div>
            </div>
            
            {/* Glossy light effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/90 backdrop-blur-3xl border border-border rounded-[1.5rem] sm:rounded-[2.5rem] w-[95vw] sm:w-full">
          <div className="sr-only">
            <DialogTitle>{photo.description || "Photo Preview"}</DialogTitle>
          </div>
          <div className="relative aspect-auto h-[60vh] sm:h-[85vh] w-full flex items-center justify-center p-4">
            <Image
              src={photo.url}
              alt={photo.description || "Portfolio Photo"}
              fill
              className="object-contain rounded-[1rem] sm:rounded-[2rem]"
            />
          </div>
          {photo.description && (
            <div className="p-4 sm:p-8 bg-gradient-to-t from-black/90 to-black/40 sm:to-transparent sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
              <DescriptionWithShowMore text={photo.description} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function DescriptionWithShowMore({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = text.length > 150;

  return (
    <div className="text-center">
      <p className={`text-white text-sm sm:text-xl font-light tracking-wider leading-relaxed ${!isExpanded && isLongText ? "line-clamp-2" : ""}`}>
        {text}
      </p>
      {isLongText && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-primary text-xs sm:text-sm font-bold uppercase tracking-tighter hover:underline"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
