"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Loader2, AlertCircle, Phone } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rePassword = formData.get("rePassword") as string;
    const phone = formData.get("phone") as string;

    if (password !== rePassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';
      const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, rePassword, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        toast("Welcome to ShopMart!", "Account created successfully. Please sign in to continue.", "success");
        router.push("/auth/signin");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to create account. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Create Account</h1>
          <p className="text-slate-500 font-medium">Join our community and enjoy a world-class shopping experience.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Full Name</label>
            <div className="relative">
              <input 
                required
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <input 
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Phone Number</label>
            <div className="relative">
              <input 
                required
                type="tel"
                name="phone"
                placeholder="01012345678"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Password</label>
            <div className="relative">
              <input 
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Confirm Password</label>
            <div className="relative">
              <input 
                required
                type="password"
                name="rePassword"
                placeholder="••••••••"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Create My Account <UserPlus size={18} /></>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-indigo-600 hover:text-slate-900 transition-colors">
              Sign In Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
