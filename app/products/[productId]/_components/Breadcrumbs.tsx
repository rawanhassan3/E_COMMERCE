import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { IProduct } from "@/interfaces/product.interface";

export default function Breadcrumbs({ product }: { product: IProduct }) {
  return (
    <nav className="flex items-center gap-2 text-sm font-medium">
      <Link href="/" className="text-slate-400 hover:text-indigo-600 transition-colors">
        <Home size={16} />
      </Link>
      
      <ChevronRight size={14} className="text-slate-300" />
      
      <Link href="/products" className="text-slate-400 hover:text-indigo-600 transition-colors">
        Shop
      </Link>
      
      <ChevronRight size={14} className="text-slate-300" />
      
      <span className="text-slate-400">
        {product.category.name}
      </span>
      
      <ChevronRight size={14} className="text-slate-300" />
      
      <span className="text-slate-900 font-bold truncate max-w-[200px] md:max-w-none">
        {product.title}
      </span>
    </nav>
  );
}
