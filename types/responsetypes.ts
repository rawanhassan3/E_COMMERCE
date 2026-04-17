import { IProduct } from "@/interfaces/product.interface";

export interface IPagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  previousPage?: number;
}

export interface IProductResponse {
  results: number;
  metadata: IPagination;
  data: IProduct[];
}
