export type PaginationType = {
  current: number;
  first: number;
  last: number;
  previous?: number | undefined;
  next?: number | undefined;
}

export type PaginationProps = {
  pagination: PaginationType;
  onChangePage: (page: number) => void;
}
