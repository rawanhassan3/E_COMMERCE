"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart, addProductToCart, updateProductQuantity, removeProductFromCart } from "@/services/products.service";
import { useSession } from "next-auth/react";

interface CartContextType {
  cartCount: number;
  cartData: any;
  isLoading: boolean;
  addToCart: (productId: string, count?: number) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const token = (session as any)?.user?.accessToken;

  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCartData(null);
      setCartCount(0);
      return;
    }
    try {
      const cartResponse = await getCart(token);
      if (cartResponse && cartResponse.data) {
        setCartData(cartResponse);
        setCartCount(cartResponse.data.products?.length || 0);
      } else {
        setCartData(null);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }, [token]);

  const addToCart = async (productId: string, count: number = 1) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const existingProduct = cartData?.data?.products?.find((p: any) => p.product?._id === productId);
      
      if (existingProduct) {
        await updateProductQuantity(productId, existingProduct.count + count, token);
      } else {
        await addProductToCart(productId, token);
        if (count > 1) {
          await updateProductQuantity(productId, count, token);
        }
      }
      await refreshCart();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, count: number) => {
    if (count < 1 || !token) return;
    try {
      await updateProductQuantity(productId, count, token);
      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) return;
    try {
      await removeProductFromCart(productId, token);
      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider value={{ cartCount, cartData, isLoading, addToCart, updateQuantity, removeItem, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
