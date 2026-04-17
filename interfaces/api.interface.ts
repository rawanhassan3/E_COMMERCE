export interface IApiResponse<T> {
  results: number;
  metadata: IPagination;
  data: T[];
}

export interface IPagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  previousPage?: number;
}
