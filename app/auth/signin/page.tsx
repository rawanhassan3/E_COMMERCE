"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        toast("Error: Login Failed", "Could not sign in. Check your credentials.", "error");
      } else {
        toast("Welcome Back!", "You have successfully signed in.", "success");
        router.push("/");
        router.refresh();
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
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please sign in to your account to continue shopping.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-black uppercase tracking-widest mb-2 px-1">Email Address</label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="block text-xs font-black text-black uppercase tracking-widest">Password</label>
              <Link href="/auth/forgot-password" className="text-[10px] font-black text-indigo-600 uppercase tracking-wider hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-black outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-slate-900 hover:bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Sign In <LogIn size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm font-bold text-slate-500">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-indigo-600 hover:text-slate-900 transition-colors">
              Sign Up Now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
