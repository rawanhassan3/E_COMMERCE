"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession } from "@/services/products.service";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function InnerCheckout() {
  const { data: session } = useSession();
  const token = (session as any)?.user?.accessToken;
  const { cartData, isLoading: isCartLoading } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    details: "",
    phone: "",
    city: ""
  });

  const cartId = cartData?.data?._id || cartData?.cartId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId || !token) return;

    setIsSubmitting(true);
    try {
      const checkoutUrl = await createCheckoutSession(cartId, formData, token);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
       console.error("Checkout Request Failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartData && isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold">Verifying order details...</p>
        </div>
      </div>
    );
  }

  const products = cartData?.data?.products || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 font-sans antialiased text-slate-900">
      <div className="max-w-4xl mx-auto">
        
   
        <div className="mb-12">
          <h1 className="text-3xl font-black tracking-tight mb-2">Checkout Details</h1>
          <p className="text-slate-500 font-medium">Please enter your shipping information to complete your purchase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
         
          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Shipping Address</label>
                  <textarea 
                    required
                    placeholder="Street name, building number, apartment..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[100px] text-sm font-bold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all placeholder:text-slate-300"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="e.g. 01012345678"
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all placeholder:text-slate-300"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">City</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. Cairo"
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-bold outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all placeholder:text-slate-300"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Wait a moment...
                      </>
                    ) : (
                      "Confirm & Pay with Stripe"
                    )}
                  </button>
                </div>

              </form>
            </div>
            
            <div className="mt-6 flex items-center justify-center bg-white/50 p-4 rounded-xl border border-dashed border-slate-300">
               <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                  Your payment information is securely processed by Stripe.
               </p>
            </div>
          </div>

          
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-lg font-black mb-6 tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {products.map((item: any) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                       <img src={item.product?.imageCover} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate opacity-80">{item.product?.title}</p>
                      <p className="text-[10px] font-bold text-indigo-400">Quantity: {item.count}</p>
                    </div>
                    <p className="text-xs font-black">EGP {item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm font-bold opacity-60">Total to pay:</span>
                <span className="text-xl font-black text-indigo-400 tracking-tighter">
                   EGP {(cartData?.data?.totalCartPrice || 0).toLocaleString()}
                </span>
              </div>
            </div>

            <Link href="/carts" className="block text-center text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest pt-2">
              ← Return to bag
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
