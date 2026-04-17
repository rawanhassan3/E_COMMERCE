"use client";

import { useState } from "react";
import { Star, ShoppingCart, Zap, Heart, Share2, Loader2 } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductInfo({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [localLoading, setLocalLoading] = useState(false);
  const hasDiscount = !!product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100) : 0;

  async function handleAddToCart() {
    setLocalLoading(true);
    try {
      await addToCart(product._id, quantity);
      toast("Success: Added to Bag!", `${product.title} is now in your cart.`, "success");
    } catch (error) {
      console.error(error);
      toast("Error: Failed to Add", "Something went wrong. Please try again.", "error");
    } finally {
      setLocalLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Brand & Stats */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            {product.category?.name}
          </span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500 transition-all">
              <Heart size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
          {product.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                fill={i < Math.floor(product.ratingsAverage) ? "currentColor" : "transparent"} 
                className={i < Math.floor(product.ratingsAverage) ? "text-amber-500" : "text-slate-300"}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-400">
            {product.ratingsAverage || 0} ({product.ratingsQuantity || 0} Reviews)
          </span>
          <Badge variant="outline" className="text-green-600 bg-green-50 border-green-100 rounded-lg py-1 px-3">
            In Stock
          </Badge>
        </div>
      </div>

      <Separator className="bg-slate-200/60" />

      {/* Price */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-black text-slate-900 tracking-tighter">
            EGP {(finalPrice || 0).toLocaleString()}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl font-medium text-slate-400 line-through">
                EGP {(product.price || 0).toLocaleString()}
              </span>
              <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none px-3 py-1 rounded-full text-sm font-bold">
                -{discountPercent}% OFF
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm font-medium text-slate-500">
          Inclusive of all taxes
        </p>
      </div>

      <div className="space-y-6 bg-slate-100/50 p-6 rounded-3xl border border-slate-200/60">
        {/* Quantity */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-slate-900">Select Quantity</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-all font-mono"
            >
              -
            </button>
            <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-all font-mono"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={handleAddToCart}
            disabled={localLoading}
            className="h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg gap-2 shadow-xl shadow-slate-900/10 transition-all active:scale-95"
          >
            {localLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ShoppingCart size={20} strokeWidth={2.5} />
            )}
            Add to Cart
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-lg gap-2 transition-all">
            <Zap size={20} fill="currentColor" />
            Buy It Now
          </Button>
        </div>
      </div>
    </div>
  );
}
