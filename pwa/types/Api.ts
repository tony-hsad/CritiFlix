export type ApiResourceBase = {
  "@id": string;
  "@type": string;
}

export type CollectionView = ApiResourceBase & {
  first: string,
  last: string,
  previous?: string,
  next?: string,
};

export type Collection<Element> = {
  totalItems: number,
  member: Array<Element>,
  search: object,
  view: CollectionView,
};
