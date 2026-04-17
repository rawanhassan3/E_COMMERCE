"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
  mainImage: string;
}

export default function ProductGallery({ images, title, mainImage }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [mainImage];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col md:flex-row-reverse gap-4">
      {/* Main Large Image Container */}
      <div className="flex-1 relative aspect-square bg-white border border-slate-200 rounded-3xl overflow-hidden group">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-contain p-8 md:p-12 transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0 scrollbar-hide md:max-h-[600px]">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative w-20 h-20 shrink-0 bg-white border outline-none rounded-2xl overflow-hidden transition-all duration-200",
              activeImage === img 
                ? "border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg shadow-indigo-600/5 scale-105" 
                : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
