"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((title: string, description?: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, type };
    
    setToasts((prev) => [...prev, newToast]);

   
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-[400px] pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex w-full items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 fade-in duration-500",
              t.type === "success" && "bg-white/90 border-green-100 shadow-green-600/5",
              t.type === "error" && "bg-rose-50/90 border-rose-100 shadow-rose-600/5",
              t.type === "info" && "bg-indigo-50/90 border-indigo-100 shadow-indigo-600/5"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              t.type === "success" && "bg-green-100 text-green-600",
              t.type === "error" && "bg-rose-100 text-rose-600",
              t.type === "info" && "bg-indigo-100 text-indigo-600"
            )}>
              {t.type === "success" && <CheckCircle2 size={20} strokeWidth={3} />}
              {t.type === "error" && <AlertCircle size={20} />}
              {t.type === "info" && <Info size={20} />}
            </div>

            <div className="flex-1 pt-1">
              <h3 className={cn(
                "font-black text-sm tracking-tight mb-1",
                t.type === "success" && "text-slate-900",
                t.type === "error" && "text-rose-900",
                t.type === "info" && "text-indigo-900"
              )}>
                {t.title}
              </h3>
              {t.description && (
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            <button 
              onClick={() => removeToast(t.id)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-300 hover:text-slate-900 transition-all"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
