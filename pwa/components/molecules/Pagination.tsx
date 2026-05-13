import Button from "../atoms/Button";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";
import type { PaginationProps, PaginationType} from "@/types/Pagination";

function Pagination({ pagination, onChangePage }: PaginationProps) {
  function getMorePaginationButtons(pagination: PaginationType) {
    const additionalPagesAmount = 2;
    const leftCurrent = pagination.current - additionalPagesAmount;
    const rightCurrent = pagination.current + additionalPagesAmount;

    const pages = [];
    for (let p = leftCurrent; p <= rightCurrent; p++) {
      const isPageBetweenBoundaries = p > pagination.first && p < pagination.last;
      if (isPageBetweenBoundaries) {
        pages.push(p);
      }
    }

    return pages;
  }

  const pages = getMorePaginationButtons(pagination);
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        onClick={() => onChangePage(pagination.first)}
        variant="secondary"
      >
        <ArrowLeftToLine size={16} />
        <span className="pl-2">{pagination.first}</span>
      </Button>

      {pages.map((pCurrent) => (
        <Button
          key={pCurrent}
          onClick={() => onChangePage(pCurrent)}
          variant={pCurrent === pagination.current ? "green" : "primary"}
        >
          {pCurrent}
        </Button>
      ))}


      <Button
        onClick={() => onChangePage(pagination.last)}
        variant="secondary"
      >
        <ArrowRightFromLine size={16} />
        <span className="pl-2">{pagination.last}</span>
      </Button>
    </div>
  );
}

export default Pagination;
