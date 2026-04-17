"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart, Eye, RefreshCcw, Loader2 } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/interfaces/product.interface";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={i < Math.floor(rating) ? "currentColor" : "transparent"}
            className={i < Math.floor(rating) ? "text-amber-400" : "text-slate-300"} 
          />
        ))}
      </div>
      <span className="text-xs font-medium text-slate-400 ml-1">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const hasDiscount = !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price;

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      await addToCart(product._id);
      toast("Success: Added to Bag!", `${product.title} added to your cart.`, "success");
    } catch (error) {
      toast("Error: Failed to Add", "Could not add item. Try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 font-sans flex flex-col relative">
      
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
          Sale
        </span>
      )}

      <div className="relative aspect-square p-6 bg-white flex items-center justify-center overflow-hidden">
        <Link href={`/products/${product._id}`} className="relative w-full h-full block">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Floating Actions */}
        <div className="absolute top-4 -right-12 group-hover:right-4 flex flex-col gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 ease-out">
          <button className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm">
            <Heart size={16} />
          </button>
          <button className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm">
            <RefreshCcw size={16} />
          </button>
          <Link href={`/products/${product._id}`} className="w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm">
            <Eye size={16} />
          </Link>
        </div>
      </div>

      <div className="p-5 pt-0 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          {product.category?.name || "Uncategorized"}
        </span>
        <Link href={`/products/${product._id}`} className="text-sm font-bold text-slate-800 mb-2 line-clamp-2 leading-relaxed hover:text-indigo-600 transition-colors">
          {product.title}
        </Link>
        
        <StarRating rating={product.ratingsAverage || 0} count={product.ratingsQuantity || 0} />
        
        <div className="mt-auto flex items-end justify-between gap-2 border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs font-medium text-slate-400 line-through">
                EGP {(product.price || 0).toLocaleString()}
              </span>
            )}
            <span className="text-lg font-black text-slate-900 leading-none">
              EGP {(finalPrice || 0).toLocaleString()}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-10 h-10 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl flex items-center justify-center transition-colors shrink-0 disabled:opacity-50 active:scale-90"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <ShoppingCart size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </article>
  );
}
