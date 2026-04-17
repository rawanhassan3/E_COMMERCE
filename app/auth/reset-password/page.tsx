"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

import { Suspense } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';
      const res = await fetch(`${BASE_URL}/api/v1/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast("Password Reset!", "You can now sign in with your new password.", "success");
        router.push("/auth/signin");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">New Password</h1>
          <p className="text-slate-500 font-medium">Create a strong password to secure your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">New Password</label>
            <div className="relative">
              <input 
                required
                type="password"
                name="newPassword"
                placeholder="••••••••"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Confirm New Password</label>
            <div className="relative">
              <input 
                required
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Reset Password <CheckCircle2 size={18} /></>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
