import type { PaginationType } from "@/types/Pagination";
import type { CollectionView } from "@/types/Api";

function getPageNumber(url: string | undefined) {
  if (!url) return undefined;
  const queryString = url.split("?")[1];
  const parameters = new URLSearchParams(queryString);
  const page = parameters.get("page");

  return Number(page);
}

function paginationFromCollectionView(view: CollectionView): PaginationType | undefined {
  if (!view) {
    return undefined;
  }

  const current = getPageNumber(view["@id"]);
  const first = getPageNumber(view.first);
  const last = getPageNumber(view.last);

  const pagination: PaginationType  = {
    current,
    first,
    last,
  };

  const previous = getPageNumber(view.previous);
  if (previous !== undefined) {
    pagination.previous = previous;
  }

  const next = getPageNumber(view.next);
  if (next !== undefined) {
    pagination.next = next;
  }

  return pagination;
}

export default paginationFromCollectionView;
