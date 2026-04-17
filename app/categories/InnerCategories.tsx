'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategories } from '@/redux/features/categorySlice';
import { ChevronRight, Filter, Layers } from 'lucide-react';

export default function InnerCategories() {
  const dispatch = useAppDispatch();
  const { items: categories, isLoading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading Categories...</p>
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
          <h2 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 font-medium mb-6">{error}</p>
          <button 
            onClick={() => dispatch(fetchCategories())}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-slate-900 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-indigo-600/10 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-600/20">
              Department Store
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
              SHOP BY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CATEGORY</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              From the latest tech to timeless fashion, explore our wide range of categories designed to cater to your every need.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/products?category=${category._id}`}
              className="group relative h-[450px] rounded-[48px] overflow-hidden bg-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-600/20 hover:-translate-y-2"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white">
                <div className="mb-4 w-12 h-1 bg-indigo-500 group-hover:w-24 transition-all duration-500"></div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  View Collection <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4 p-8 bg-white rounded-[40px] shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center">
              <Layers size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900">Curated Selection</h4>
            <p className="text-slate-500 font-medium">Expertly picked items from world-class brands across all categories.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-8 bg-white rounded-[40px] shadow-sm">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center">
              <Filter size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900">Smart Filtering</h4>
            <p className="text-slate-500 font-medium">Find exactly what you need with our advanced category filtering system.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-8 bg-white rounded-[40px] shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center">
              <ChevronRight size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900">Seamless Flow</h4>
            <p className="text-slate-500 font-medium">Smooth transitions from browsing categories to finding your next purchase.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
