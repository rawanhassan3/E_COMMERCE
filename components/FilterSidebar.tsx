"use client";

import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "All", "Women's Fashion", "Men's Fashion", 
  "Electronics", "Sporting Goods", "Beauty", "Kids"
];

export default function FilterSidebar({ totalProducts }: { totalProducts: number }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 font-sans">
      <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
          <SlidersHorizontal size={18} className="text-indigo-600" />
          Filter Products
        </h2>

        {/* Category */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Category
          </h3>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  defaultChecked={c === "All"}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600 accent-indigo-600"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {c}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8 border-t border-slate-100 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Price Range
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
            <span className="text-slate-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            Apply Filters
          </button>
        </div>

        {/* Rating */}
        <div className="mb-8 border-t border-slate-100 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Rating
          </h3>
          <div className="flex flex-col gap-3">
            {[5, 4, 3, 2].map((r) => (
              <label key={r} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating" 
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600 accent-indigo-600"
                />
                <span className="flex items-center text-amber-400 text-sm tracking-widest">
                  {"★".repeat(r)}{"☆".repeat(5 - r)}
                  <span className="text-slate-400 ml-2 tracking-normal text-xs font-medium group-hover:text-slate-600">
                    & up
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Availability
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-600 accent-indigo-600" />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">In Stock</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-600 accent-indigo-600" />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">On Sale</span>
            </label>
          </div>
        </div>

      </div>
    </aside>
  );
}
