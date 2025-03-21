export type Pagination<T> = {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
};
