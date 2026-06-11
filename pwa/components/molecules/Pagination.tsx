import Button, {ButtonProps} from "../atoms/Button";
import type { PaginationProps } from "@/types/Pagination";
import React from "react";

type PaginationButtonProps = { current: string; page?: string; onClick: (page: string) => void; buttonProps?: Pick<ButtonProps, 'icon' | 'type' | 'variant'>};
const PaginationButton: React.FC<PaginationButtonProps> = ({ current, onClick, page, buttonProps = {} }) => page && (
  <Button disabled={current === page} onClick={() => current !== page && onClick(page)} {...buttonProps}>
    {page}
  </Button>
)

function Pagination({ pagination, onChangePage }: PaginationProps) {
  if (!pagination) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <PaginationButton current={pagination.current} page={pagination.first} onClick={onChangePage} buttonProps={{
        variant: 'secondary',
        icon: { name: 'arrowLeft' }
      }} />
      <PaginationButton current={pagination.current} page={pagination.first !== pagination.previous ? pagination.previous : ''} onClick={onChangePage} />
      Current {pagination.current}
      <PaginationButton current={pagination.current} page={pagination.last !== pagination.next ? pagination.next : ''} onClick={onChangePage} />
      <PaginationButton current={pagination.current} page={pagination.last} onClick={onChangePage} buttonProps={{
        variant: 'secondary',
        icon: { name: 'arrowRight' }
      }} />
    </div>
  );
}

export default Pagination;
