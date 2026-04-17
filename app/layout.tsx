import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ShopMart | Your Premium E-Commerce Destination",
    template: "%s | ShopMart",
  },
  description: "Discover curated collections of premium products at ShopMart. Experience seamless shopping with fast delivery and secure payments.",
  keywords: ["e-commerce", "shopping", "premium products", "fashion", "electronics", "ShopMart"],
  authors: [{ name: "ShopMart Team" }],
  creator: "ShopMart",
  publisher: "ShopMart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ShopMart | Your Premium E-Commerce Destination",
    description: "Shop the latest trends and premium collections at ShopMart. Quality guaranteed.",
    url: "", // User should update this
    siteName: "ShopMart",
    images: [
      {
        url: "/images/hero-banner.png", 
        width: 1200,
        height: 630,
        alt: "ShopMart Premium Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopMart | Premium E-Commerce",
    description: "Discover curated collections of premium products at ShopMart.",
    images: ["/images/hero-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import AuthProvider from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

import StoreProvider from "@/components/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Navbar />
                <main className="flex-1 bg-white">{children}</main>
                <Footer />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
