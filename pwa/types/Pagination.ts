export type PaginationType = {
  current: string;
  first: string;
  last: string;
  previous?: string;
  next?: string;
}

export type PaginationProps = {
  pagination: PaginationType;
  onChangePage: (page: string) => void;
}
