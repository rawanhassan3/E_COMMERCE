import { IProduct } from "@/interfaces/product.interface";
import { IProductResponse } from "@/types/responsetypes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProducts(
  limit: number = 32,
  page: number = 1,
  category?: string,
  brand?: string
): Promise<IProduct[]> {
  let url = `${BASE_URL}/api/v1/products?limit=${limit}&page=${page}`;
  if (category) url += `&category=${category}`;
  if (brand) url += `&brand=${brand}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  const json: IProductResponse = await res.json();
  return json.data;
}

export async function getCategories(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/api/v1/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function getBrands(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/api/v1/brands`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function getSubcategories(categoryId?: string): Promise<any[]> {
  const url = categoryId 
    ? `${BASE_URL}/api/v1/categories/${categoryId}/subcategories`
    : `${BASE_URL}/api/v1/subcategories`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function getProductById(id: string): Promise<IProduct> {
  const res = await fetch(`${BASE_URL}/api/v1/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
  }

  const json: { data: IProduct } = await res.json();
  return json.data;
}

export async function getRelatedProducts(categoryId: string, limit: number = 4): Promise<IProduct[]> {
  const res = await fetch(`${BASE_URL}/api/v1/products?category=${categoryId}&limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const json: IProductResponse = await res.json();
  return json.data;
}

export async function addProductToCart(productId: string, token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to add product ${productId}: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function createCheckoutSession(cartId: string, shippingAddress: { details: string, phone: string, city: string }, token: string): Promise<string | null> {
  const res = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token
    },
    body: JSON.stringify({ shippingAddress }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.session.url;
}

export async function getCart(token: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/api/v1/cart`, {
      headers: {
        token: token
      },
      cache: "no-store",
    });
  
    if (!res.ok) {
      return null;
    }
  
    const data = await res.json();
    return data;
}

export async function updateProductQuantity(productId: string, count: number, token: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/v1/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token
    },
    body: JSON.stringify({ count }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function removeProductFromCart(productId: string, token: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        token: token
      },
      cache: "no-store",
    });
  
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
}

export async function getAllOrders(token: string): Promise<any[]> {
  if (!token || !token.includes('.')) return [];
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const userId = tokenPayload.id;

  const res = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
    headers: {
      token: token,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}