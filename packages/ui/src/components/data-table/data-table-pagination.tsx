"use client";

import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { usePagination } from "../../hooks/use-pagination";
import { Button } from "../ui/button";

export interface TablePaginationProps {
  totalPages: number;
  pageSize: number;
}

export const DataTablePagination = ({
  totalPages,
  pageSize,
}: TablePaginationProps) => {
  const {
    currentPage,
    getNextPage,
    getPreviousPage,
    setCurrentPage,
    disableNext,
    disablePrevious,
  } = usePagination({
    totalPages: totalPages,
    pageSize,
  });

  const totalLength = Math.ceil(totalPages / pageSize);

  return (
    <>
      <div className=" md:flex border-border mt-[20px] flex w-full gap-8 border-t py-5">
        <div className="flex w-full items-center justify-between gap-3">
          <Button
            disabled={disablePrevious}
            onClick={getPreviousPage}
            variant="ghost"
          >
            <ChevronLeft size={18} />
            Anterior
          </Button>
          <div className="flex items-center gap-3">
            {Array.from({ length: totalLength }, (_, i) => i + 1).map(
              (page, i) => {
                const isSelected = page === currentPage;
                const showInitialAndFinalPage = i > 0 && i < totalLength - 1;
                const showNextFivePage = i > currentPage + 1;
                const showPreviousFivePage = i < currentPage - 3;

                return (
                  <div
                    key={page}
                    data-hidden={
                      showInitialAndFinalPage &&
                      (showNextFivePage || showPreviousFivePage)
                    }
                    className="group flex items-center gap-2 data-[hidden=true]:hidden"
                  >
                    {showNextFivePage && <MoreHorizontal size={16} />}
                    <Button
                      disabled={disableNext && disablePrevious}
                      variant={isSelected ? "default" : "ghost"}
                      className="h-8 w-8 transition-all group-data-[hidden=true]:hidden"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                    {showPreviousFivePage && <MoreHorizontal size={16} />}
                  </div>
                );
              }
            )}
          </div>
          <Button disabled={disableNext} onClick={getNextPage} variant="ghost">
            Próximo
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      <div className="w-full flex md:hidden items-center justify-between p-[30px]">
        <Button
          disabled={disablePrevious}
          onClick={getPreviousPage}
          variant="ghost"
        >
          <ArrowLeft size={18} />
        </Button>
        <p className="text-[14px] leading-[20px] font-normal text-secondary">
          Page {currentPage} of {totalLength}
        </p>
        <Button disabled={disableNext} onClick={getNextPage} variant="ghost">
          <ArrowRight size={18} />
        </Button>
      </div>
    </>
  );
};
