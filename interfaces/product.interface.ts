export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface IProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: ICategory;
  subcategory: ISubcategory[];
  brand: IBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}
