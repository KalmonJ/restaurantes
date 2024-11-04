"use client";

import type { ColumnDef, SortingState, Table } from "@tanstack/react-table";
import type { ChangeEvent, PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useQueryParams } from "../hooks/use-query-params";

function getContext<T = any>() {
  return createContext<DataTableContextProps<T>>(
    {} as DataTableContextProps<T>
  );
}

export type DataTableContextProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  table: Table<T>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rowAction: (data: T) => void;
};

export type DataTableProviderProps<T extends Record<string, unknown>> = Pick<
  DataTableContextProps<T>,
  "columns" | "data"
> & {
  rowAction: (data: T) => void;
};

export const DataTableContext = getContext();

export const DataTableProvider = <T extends Record<string, unknown>>({
  children,
  data: dbData,
  rowAction,
  columns,
}: PropsWithChildren<DataTableProviderProps<T>>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(() => dbData, [dbData]);

  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //@ts-expect-error
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
  });

  const query = useQueryParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    query.set("query", value);
  };

  return (
    <DataTableContext.Provider
      value={{ data, table, columns, handleChange, rowAction }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
