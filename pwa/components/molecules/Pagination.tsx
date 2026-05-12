import Button from "../atoms/Button";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";
import type { PaginationProps } from "@/types/Pagination";

function Pagination({ pagination, onChangePage }: PaginationProps) {
  const pages = [];
  for (let p = pagination.current - 2; p <= pagination.current + 2; p++) {
    if (p > pagination.first && p < pagination.last) {
      pages.push(p);
    }
  }

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
