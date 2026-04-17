"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  Package, 
  Layers, 
  Tag, 
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cartCount } = useCart();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Shop", href: "/products", icon: <Package size={20} /> },
    { name: "Categories", href: "/categories", icon: <Layers size={20} /> },
    { name: "Brands", href: "/brands", icon: <Tag size={20} /> },
    { name: "Cart", href: "/carts", icon: <ShoppingCart size={20} /> },
    { name: "My Orders", href: "/allorders", icon: <ShoppingBag size={20} /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-indigo-600 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:bg-slate-900 group-hover:rotate-12 transition-all duration-500">
              <ShoppingBag className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">
              SHOPMART
            </span>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl relative items-center ml-4">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-slate-900 text-sm rounded-full py-2.5 pl-5 pr-12 outline-none border border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
            <button className="absolute right-1 w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors">
              <Search size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-600">
            {navLinks.filter(link => link.name !== "Cart").map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-colors hover:text-indigo-600 ${pathname === link.href ? 'text-indigo-600' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-5 flex-shrink-0">
            {/* User Desktop */}
            <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-5">
              {session ? (
                <div className="flex items-center gap-3 group relative cursor-pointer" onClick={() => signOut()}>
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    {session.user?.name?.[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-indigo-600 tracking-wider leading-none mb-1">Account</span>
                    <span className="text-sm font-black text-slate-900 leading-none group-hover:text-rose-600 transition-colors">Sign Out</span>
                  </div>
                </div>
              ) : (
                <Link href="/auth/signin" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <User size={16} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">Account</span>
                    <span className="text-sm font-bold text-slate-700 leading-none group-hover:text-indigo-600 transition-colors">Sign In</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-4 text-slate-500">
              <button className="hidden sm:flex w-10 h-10 items-center justify-center hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                <Heart size={22} strokeWidth={1.8} />
              </button>
              <Link href="/carts" className="w-10 h-10 flex items-center justify-center hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
                <ShoppingCart size={22} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────────── */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[80] shadow-2xl transition-transform duration-500 ease-out transform lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-white" size={16} strokeWidth={2.5} />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tighter">SHOPMART</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Section Mobile */}
          <div className="p-6 border-b border-slate-100">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-100">
                  {session.user?.name?.[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900">{session.user?.name}</span>
                  <button 
                    onClick={() => signOut()}
                    className="text-xs font-bold text-rose-500 mt-1 flex items-center gap-1"
                  >
                    <LogOut size={12} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth/signin"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900">Sign In</span>
                  <span className="text-xs font-bold text-slate-400">Join our community</span>
                </div>
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                    pathname === link.href 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={pathname === link.href ? 'text-indigo-600' : 'text-slate-400'}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Branding */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
              © 2024 SHOPMART PREMIUM
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
