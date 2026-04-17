"use client";

import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export default function TrustElements() {
  const items = [
    { 
      icon: Truck, 
      title: "Free Delivery", 
      desc: "On orders over EGP 500",
      color: "bg-blue-50 text-blue-600"
    },
    { 
      icon: RotateCcw, 
      title: "30-Day Returns", 
      desc: "Hassle-free money back",
      color: "bg-orange-50 text-orange-600"
    },
    { 
      icon: ShieldCheck, 
      title: "Secure Payment", 
      desc: "100% safe checkout",
      color: "bg-green-50 text-green-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
            <item.icon size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.title}</h4>
            <p className="text-xs font-medium text-slate-500 leading-tight">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
