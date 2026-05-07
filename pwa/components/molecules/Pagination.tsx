import Button from "../atoms/Button";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";
import type { PaginationProps } from "@/types/Pagination";

function Pagination({ pagination, onChangePage }: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        onClick={() => onChangePage(pagination.first)}
        icon={ <ArrowLeftToLine /> }
        variant="secondary"
      >
        {pagination.first}
      </Button>

      {pagination.previous && (
        <Button
          onClick={() => onChangePage(pagination.previous)}
          variant="secondary"
        >
          {pagination.previous}
        </Button>
      )}

      <span>{pagination.current}</span>

      {pagination.next && (
        <Button
          onClick={() => onChangePage(pagination.next)}
          variant="secondary"
        >
          {pagination.next}
        </Button>
      )}

      <Button
        onClick={() => onChangePage(pagination.last)}
        icon={ <ArrowRightFromLine /> }
        variant="secondary"
      >
        {pagination.last}
      </Button>
    </div>
  );
}

export default Pagination;
