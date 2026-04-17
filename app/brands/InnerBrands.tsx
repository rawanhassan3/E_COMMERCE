'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchBrands } from '@/redux/features/brandSlice';
import { ChevronRight } from 'lucide-react';

export default function InnerBrands() {
  const dispatch = useAppDispatch();
  const { items: brands, isLoading, error } = useAppSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading Brands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-500 font-medium mb-6">{error}</p>
          <button 
            onClick={() => dispatch(fetchBrands())}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <header className="bg-[#432DD7] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-indigo-100/60 text-xs font-bold uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white">Brands</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                Our <span className="text-indigo-300">Partners</span>
              </h1>
              <p className="text-indigo-100/80 text-lg font-medium leading-relaxed">
                Discover the world's leading brands all in one place. We curate only the best for our collection.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
              <div className="px-6 py-3 bg-white text-slate-900 font-black rounded-xl text-sm shadow-lg">
                {brands.length} Total Brands
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand._id} 
              href={`/products?brand=${brand._id}`}
              className="group relative bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-600/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-indigo-50/0 group-hover:from-indigo-50 group-hover:to-white transition-colors duration-500"></div>
              
              <div className="relative z-10 w-full aspect-square mb-6 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <h3 className="relative z-10 text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                {brand.name}
              </h3>
              <p className="relative z-10 text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 group-hover:text-slate-500">
                Explore Products
              </p>
              
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 shadow-lg shadow-indigo-600/20">
                <ChevronRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-[40px] bg-slate-900 overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Can't find what you're looking for?
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                Our inventory is updated daily. Subscribe to get notified about new arrivals from your favorite brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white focus:text-slate-900 outline-none transition-all flex-1 font-bold"
                />
                <button className="h-16 px-10 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 whitespace-nowrap">
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
