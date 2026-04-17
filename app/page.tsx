import { getProducts, getCategories } from "@/services/products.service";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { IProduct } from '@/interfaces/product.interface';

export const metadata = {
  title: 'ShopMart | Your Premium E-Commerce Destination',
  description: 'Discover curated collections of premium products at ShopMart.',
};

export default async function Home() {
  let products: IProduct[] = [];
  let categories: any[] = [];
  
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      getProducts(8),
      getCategories()
    ]);
    products = productsRes || [];
    categories = categoriesRes || [];
  } catch (error) {
    console.error("Home page data fetch error:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      
      <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden">
        <Image
          src="/images/hero-banner.png"
          alt="Premium Collection"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent flex items-center">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            <div className="max-w-2xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest shadow-sm">
                <Zap size={14} fill="currentColor" />
                New Season Arrival
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                ELEVATE <br />
                <span className="text-indigo-600">EVERYDAY</span> <br />
                LIVING.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-lg leading-relaxed">
                Discover our curated collection of premium products designed to integrate seamlessly into your lifestyle.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/products">
                  <button className="h-16 px-10 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 transition-all flex items-center gap-3 active:scale-95">
                    Shop Collection
                    <ShoppingBag size={20} />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="h-16 px-10 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 font-bold rounded-2xl transition-all flex items-center gap-2 active:scale-95">
                    Our Story
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12 md:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Fast Delivery</h3>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Orders over EGP 500</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Secure Payment</h3>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">100% Secure Transaction</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <RotateCcw size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Easy Returns</h3>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">30 Days Money Back</p>
            </div>
          </div>
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">24/7 Support</h3>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-3">Browse Categories</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Shop by Category</h2>
            </div>
            <Link href="/categories" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-all">
              View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(0, 6).map((cat: any) => (
              <Link key={cat._id} href={`/products?category=${cat._id}`} className="group block text-center">
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-600/10 group-hover:-translate-y-2">
                  <Image
                    src={cat.image || "/placeholder.png"}
                    alt={cat.name}
                    fill
                    className="object-cover p-4 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500"></div>
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-3">Best Sellers</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Trending Products</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Stay ahead of the curve with our most popular picks this week. Hand-selected for quality and style.
              </p>
            </div>
            <Link href="/products">
              <button className="h-14 px-8 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95 flex items-center gap-2">
                Explore All Products <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-[40px] bg-indigo-600 overflow-hidden min-h-[400px] flex items-center p-8 md:p-16 shadow-2xl shadow-indigo-600/30">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-900/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 max-w-2xl space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                Get <span className="text-slate-900">20% Off</span> Your <br />First Order.
              </h2>
              <p className="text-lg md:text-xl text-indigo-100 font-medium">
                Join our newsletter and stay updated on new arrivals, exclusive offers and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-16 px-8 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:bg-white focus:text-slate-900 outline-none transition-all flex-1 min-w-[300px] font-bold"
                />
                <button className="h-16 px-10 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-lg active:scale-95 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">
                * No spam, ever. Only the best deals.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
