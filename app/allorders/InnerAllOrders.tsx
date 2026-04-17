"use client";
 

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, CheckCircle2, MapPin, Phone, Package, ArrowRight, CreditCard, Clock } from "lucide-react";

interface OrderItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
  count: number;
  price: number;
  _id: string;
}

interface Order {
  _id: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  shippingAddress?: {
    details: string;
    phone: string;
    city: string;
  };
}

function StatusBadge({ isPaid, isDelivered }: { isPaid: boolean; isDelivered: boolean }) {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-black px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
        <CheckCircle2 size={12} /> Delivered
      </span>
    );
  }
  if (isPaid) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[11px] font-black px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-wider">
        <Package size={12} /> Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-black px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
      <Clock size={12} /> Pending
    </span>
  );
}

export default function InnerAllOrders({ orders }: { orders: Order[] }) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto">

        
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 mb-10 shadow-2xl shadow-indigo-600/30">
          
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <CheckCircle2 size={34} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
                Payment Successful! 🎉
              </h1>
              <p className="text-indigo-200 font-medium text-sm">
                Thank you for shopping with ShopMart. Your order is confirmed and being processed.
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 bg-white text-indigo-600 text-sm font-black px-5 py-3 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shrink-0 shadow-lg"
            >
              Shop More <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Orders</h2>
            <p className="text-slate-500 font-medium text-sm mt-0.5">
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </p>
          </div>
          <Link href="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Continue Shopping →
          </Link>
        </div>

        
        {orders.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 flex flex-col items-center text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
              <ShoppingBag size={36} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No orders yet</h3>
            <p className="text-slate-500 font-medium mb-6 max-w-xs">
              You haven't placed any orders yet. Start exploring our products!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              Browse Products <ArrowRight size={18} />
            </Link>
          </div>
        )}

         
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
            >
              
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-sm shrink-0">
                    #{orders.length - index}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                    <p className="text-sm font-black text-slate-700 tracking-tight font-mono">
                      {order._id.slice(-12).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge isPaid={order.isPaid} isDelivered={order.isDelivered} />
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider capitalize">
                    <CreditCard size={12} /> {order.paymentMethodType}
                  </span>
                </div>
              </div>

              
              <div className="px-6 py-5">
                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                        {item.product?.imageCover ? (
                          <Image
                            src={item.product.imageCover}
                            alt={item.product?.title || "Product"}
                            width={56}
                            height={56}
                            className="object-contain w-full h-full mix-blend-multiply"
                          />
                        ) : (
                          <Package size={20} className="text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {item.product?.title || "Product"}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">
                          Qty: {item.count} × EGP {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm font-black text-slate-900 shrink-0">
                        EGP {(item.price * item.count).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                
                {order.shippingAddress && (
                  <div className="mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Shipping Address</p>
                        <p className="text-xs font-bold text-slate-700">
                          {order.shippingAddress.details}, {order.shippingAddress.city}
                        </p>
                      </div>
                    </div>
                    {order.shippingAddress.phone && (
                      <div className="flex items-start gap-2">
                        <Phone size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Phone</p>
                          <p className="text-xs font-bold text-slate-700">{order.shippingAddress.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs font-bold text-slate-400">
                  Placed on {formatDate(order.createdAt)}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">Order Total:</span>
                  <span className="text-lg font-black text-indigo-600 tracking-tighter">
                    EGP {order.totalOrderPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
