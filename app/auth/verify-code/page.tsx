"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

import { Suspense } from "react";

function VerifyCodeContent() {
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
    const resetCode = formData.get("resetCode") as string;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      });

      const data = await res.json();

      if (res.ok && data.status === "Success") {
        toast("Code Verified!", "You can now reset your password.", "success");
        router.push(`/auth/reset-password?email=${encodeURIComponent(email || "")}`);
      } else {
        setError(data.message || "Invalid or expired reset code.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Verify Code</h1>
          <p className="text-slate-500 font-medium">Enter the 6-digit code we sent to <span className="text-slate-900 font-bold">{email}</span></p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Reset Code</label>
            <input 
              required
              type="text"
              name="resetCode"
              placeholder="e.g. 123456"
              maxLength={6}
              className="w-full h-16 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-2xl text-center font-black tracking-[1em] outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-200"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Verify Code <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-500">
            Didn't receive the code?{" "}
            <button onClick={() => router.back()} className="text-indigo-600 hover:text-slate-900 transition-colors">
              Resend
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600" /></div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
