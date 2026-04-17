"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, CreditCard, Loader2, TicketPercent } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function InnerCart() {
  const { cartData, updateQuantity, removeItem, isLoading } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  const handleUpdateQuantity = async (productId: string, count: number) => {
    setUpdatingItemId(productId);
    await updateQuantity(productId, count);
    setUpdatingItemId(null);
  };

  const handleRemoveItem = async (productId: string) => {
    setRemovingItemId(productId);
    await removeItem(productId);
    setRemovingItemId(null);
  };

  const products = cartData?.data?.products || [];
  const totalCartPrice = products.reduce((acc: number, item: any) => acc + ((item.price || 0) * (item.count || 1)), 0);

  if (!cartData && isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold">Loading your shopping bag...</p>
      </div>
    )
  }

  const logData = {
    ...cartData,
    cartId: cartData?.data?._id || cartData?.cartId
  };

  console.log("response:", logData);
  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-white">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-slate-400" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-sm text-center font-medium">
          Looks like you haven't added anything to your cart yet. Go ahead and explore our latest collections.
        </p>
        <Link href="/products">
          <Button className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 shadow-lg shadow-indigo-600/20 transition-all">
            Start Shopping
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Shopping Bag</h1>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-indigo-200">
              {products.length} Items
            </span>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-all">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-4">
            {products.map((item: any) => (
              <div key={item._id} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="relative w-full sm:w-32 aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={item.product?.imageCover || "/placeholder.png"}
                    alt={item.product?.title || "Product"}
                    fill
                    className="object-contain p-2 mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Link href={`/products/${item.product?._id}`} className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors line-clamp-1">
                        {item.product?.title || "Product Name"}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.product?._id)}
                        disabled={removingItemId === item.product._id}
                        className="text-slate-300 hover:text-rose-500 transition-colors bg-slate-50 p-2 rounded-xl hover:bg-rose-50 disabled:opacity-50"
                      >
                        {removingItemId === item.product._id ? (
                          <Loader2 size={18} className="animate-spin text-rose-500" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                    <span className="text-xs font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {item.product.category?.name || "Premium Category"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-1 border border-slate-100 rounded-xl p-1 bg-slate-50/50">
                      <button
                        onClick={() => handleUpdateQuantity(item.product?._id, item.count - 1)}
                        disabled={updatingItemId === item.product?._id || item.count <= 1}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors hover:bg-white rounded-lg disabled:opacity-50"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-8 flex items-center justify-center font-black text-slate-900">
                        {updatingItemId === item.product?._id ? (
                          <Loader2 size={14} className="animate-spin text-indigo-600" />
                        ) : (
                          item.count
                        )}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product?._id, item.count + 1)}
                        disabled={updatingItemId === item.product?._id}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors hover:bg-white rounded-lg disabled:opacity-50"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      {item.product.priceAfterDiscount && item.product.priceAfterDiscount < item.product.price && (
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-slate-400 line-through">
                            EGP {(item.product.price * item.count).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <span className="text-lg font-black text-slate-900 leading-none">
                        EGP {((item.price || 0) * (item.count || 1)).toLocaleString()}
                      </span>
                      {item.product.priceAfterDiscount && (
                        <span className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tight">
                          You save EGP {((item.product.price - item.product.priceAfterDiscount) * item.count).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900">EGP {(totalCartPrice || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-black">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Tax Estimate</span>
                  <span className="text-slate-900">EGP 0</span>
                </div>
                <Separator className="bg-slate-100" />
                <div className="flex justify-between pt-2">
                  <span className="text-lg font-black text-slate-900">Order Total</span>
                  <span className="text-2xl font-black text-indigo-600 tracking-tighter">EGP {(totalCartPrice || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="mb-6">
                <label htmlFor="coupon" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  Have a promo code?
                </label>
                <div className="relative flex items-center group">
                  <label htmlFor="coupon" className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <TicketPercent size={18} />
                  </label>
                  <input
                    id="coupon"
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-24 text-sm font-bold text-slate-900 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
                  />
                  <button 
                    className="absolute right-1.5 px-4 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Preparing Checkout...
                  </>
                ) : (
                  <>
                    Checkout Now
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </>
                )}
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-dashed border-slate-300 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <CreditCard size={18} />
              </div>
              <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">
                Safe & Secure payments with 256-bit encryption. We accept all major cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
