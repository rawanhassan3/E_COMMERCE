"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/interfaces/product.interface";
import { Star, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ProductTabs({ product }: { product: IProduct }) {
  return (
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden p-6 md:p-10 shadow-sm">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="bg-slate-100/50 p-1.5 h-14 rounded-2xl mb-10 w-full sm:w-auto">
          <TabsTrigger value="description" className="px-8 h-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-bold transition-all text-slate-500">
            Description
          </TabsTrigger>
          <TabsTrigger value="specifications" className="px-8 h-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-bold transition-all text-slate-500">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="reviews" className="px-8 h-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm font-bold transition-all text-slate-500">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-0 outline-none">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Product Overview</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
               <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" /> Premium Materials
                  </h4>
                  <p className="text-slate-500 text-sm italic">Crafted with the finest attention to detail using sustainable practices.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" /> Modern Aesthetics
                  </h4>
                  <p className="text-slate-500 text-sm italic">Designed to blend perfectly into any contemporary lifestyle or setting.</p>
               </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-0 outline-none">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Technical details</h3>
            <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              {[
                { label: "Category", value: product.category.name },
                { label: "Sub-category", value: product.subcategory?.[0]?.name || "N/A" },
                { label: "Brand", value: product.brand?.name || "Premium Brand" },
                { label: "Item Sku", value: product._id.slice(-8).toUpperCase() },
                { label: "Weight", value: "0.5 kg" },
                { label: "Availability", value: "Ship in 24 hours" },
              ].map((spec, idx) => (
                <div key={idx} className={`flex items-center justify-between p-5 ${idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} border-b border-slate-100 last:border-none`}>
                  <span className="font-bold text-slate-500 text-sm tracking-wide uppercase">{spec.label}</span>
                  <span className="font-black text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-0 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-4 space-y-8">
                <div className="bg-slate-50 p-8 rounded-3xl text-center border border-slate-100">
                   <div className="text-6xl font-black text-slate-900 mb-2">{product.ratingsAverage}</div>
                   <div className="flex justify-center text-amber-500 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={24} fill={i < Math.floor(product.ratingsAverage) ? "currentColor" : "transparent"} />
                      ))}
                   </div>
                   <div className="text-slate-500 font-bold">Based on {product.ratingsQuantity} Ratings</div>
                </div>
             </div>
             <div className="lg:col-span-8 flex flex-col gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500">U{i}</div>
                           <div>
                              <div className="font-bold text-slate-900 leading-none mb-1 text-lg">Customer User {i}</div>
                              <div className="text-xs font-medium text-slate-400">Verified Purchase • 2 days ago</div>
                           </div>
                        </div>
                        <div className="flex text-amber-500">
                           {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                     </div>
                     <p className="text-slate-600 leading-relaxed font-medium">
                        "Extremely satisfied with the purchase! The quality exceeded my expectations and the delivery was blazing fast. Truly a premium experience from start to finish."
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
