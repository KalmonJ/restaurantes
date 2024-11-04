import { useState } from "react";

import { useQueryParams } from "./use-query-params";

interface UsePaginationProps {
  totalPages: number;
  pageSize: number;
}

export const usePagination = ({
  totalPages,
  pageSize = 10,
}: UsePaginationProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const query = useQueryParams();
  const currentPage = Number(query.get("page") ?? "1");
  const disablePrevious = currentPage === 1;
  const disableNext = currentPage === totalPages;

  const getNextPage = () => {
    query.set("page", currentPage + 1);
  };

  const getPreviousPage = () => {
    query.set("page", currentPage - 1);
  };

  const setPageSize = (pageSize: number) => {
    query.set("per_page", pageSize);
    setItemsPerPage(pageSize);
  };

  const setCurrentPage = (page: number) => {
    query.set("page", page);
  };

  return {
    currentPage,
    getNextPage,
    getPreviousPage,
    setCurrentPage,
    itemsPerPage,
    disablePrevious,
    disableNext,
    setPageSize,
  };
};
