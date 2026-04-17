'use client';

import React from 'react';
import ProductCard from "@/components/ProductCard";
import Image from 'next/image';
import { IProduct } from '@/interfaces/product.interface';

interface InnerProductsProps {
  products: IProduct[];
  selectedCategory?: any;
  selectedBrand?: any;
}

export default function InnerProducts({ products, selectedCategory, selectedBrand }: InnerProductsProps) {
  const selection = selectedBrand || selectedCategory;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <header className="bg-slate-900 border-b border-white/10 py-16 md:py-24 px-6 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            
            {selection ? (
              <>
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[32px] p-4 flex items-center justify-center shadow-2xl shadow-indigo-500/20 animate-in zoom-in duration-500">
                  <Image 
                    src={selection.image} 
                    alt={selection.name} 
                    width={100} 
                    height={100} 
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">
                    {selectedBrand ? "Brand Collection" : "Category Collection"}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                    {selection.name}
                  </h1>
                  <p className="text-slate-400 font-medium">
                    Explore our exclusive selection of {selection.name} products.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">
                  Discover
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  All Products
                </h1>
                <p className="text-slate-400 font-medium max-w-xl">
                  Browse through our entire collection of premium quality products from world-class brands.
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex flex-col gap-10">

          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-slate-500 font-medium text-sm">
                Showing <strong className="text-slate-900">1–{products.length}</strong> of <strong className="text-slate-900">{products.length}</strong> results
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700">Sort by:</span>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.filter(p => !!p).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500 font-medium mb-8">Try adjusting your filters or browse other categories.</p>
                <button 
                  onClick={() => window.location.href = '/products'}
                  className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-200">
              <button disabled className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 cursor-not-allowed font-medium shadow-sm">
                Prev
              </button>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 border border-indigo-600 text-white font-bold shadow-sm">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 font-medium transition-colors shadow-sm">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 font-medium transition-colors shadow-sm">
                  3
                </button>
                <span className="w-10 flex justify-center text-slate-400 font-bold">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 font-medium transition-colors shadow-sm">
                  12
                </button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 font-medium transition-colors shadow-sm">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
