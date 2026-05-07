type PaginationType = {
  current: number;
  first: number;
  last: number;
  previous?: number;
  next?: number;
}

export type PaginationProps = {
  pagination: PaginationType;
  onChangePage: (page: number) => void;
}
