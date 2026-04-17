import Link from "next/link";
import { Globe, Mail, Link as LinkIcon, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-2xl font-black tracking-tight text-white mb-6 hover:text-indigo-400 transition-colors">
              SHOPMART
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
              Your premium destination for high-quality products. We bring you the best selection with a seamless, world-class shopping experience.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-slate-400">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-slate-400">
                <Mail size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-slate-400">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-slate-400">
                <LinkIcon size={18} />
              </a>
            </div>
          </div>

          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white hover:translate-x-1 inline-block transition-all">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 inline-block transition-all">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-all">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white hover:translate-x-1 inline-block transition-all">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white hover:translate-x-1 inline-block transition-all">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-white hover:translate-x-1 inline-block transition-all">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Categories</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/products?cat=electronics" className="hover:text-white hover:translate-x-1 inline-block transition-all">Electronics</Link></li>
              <li><Link href="/products?cat=fashion" className="hover:text-white hover:translate-x-1 inline-block transition-all">Fashion</Link></li>
              <li><Link href="/products?cat=home" className="hover:text-white hover:translate-x-1 inline-block transition-all">Home & Living</Link></li>
              <li><Link href="/products?cat=beauty" className="hover:text-white hover:translate-x-1 inline-block transition-all">Beauty</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex items-center justify-between flex-col md:flex-row gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-slate-400">Visa</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-slate-400">Mastercard</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-slate-400">PayPal</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-slate-400">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
