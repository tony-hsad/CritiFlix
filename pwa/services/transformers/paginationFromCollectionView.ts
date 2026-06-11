import type { PaginationType } from "@/types/Pagination";
import type { CollectionView } from "@/types/Api";

function getPageNumber(url?: string) {
  return new URLSearchParams(url?.split("?").pop()).get("page") ?? '';
}

function paginationFromCollectionView(view: CollectionView) {
  if (!view) {
    return undefined;
  }

  return {
    current: getPageNumber(view["@id"]),
    first: getPageNumber(view.first),
    last: getPageNumber(view.last),
    previous: getPageNumber(view.previous),
    next: getPageNumber(view.next),
  };
}

export default paginationFromCollectionView;
