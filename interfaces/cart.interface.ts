import { IProduct } from "./product.interface";

export interface ICartProduct {
  _id: string;
  count: number;
  price: number;
  product: IProduct;
}

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: ICart;
}

export interface IAddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: ICart;
}