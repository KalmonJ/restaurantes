"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { flexRender } from "@tanstack/react-table";

import { cn } from "../../lib/utils";

import { DataTableProvider } from "../../context/data-table";
import { useDataTable } from "../../hooks/use-data-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input, type InputProps } from "../ui/input";

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  rowAction: (data: T) => void;
}

type DataTableContainerProps = HTMLAttributes<HTMLDivElement>;

type DataTableSearchInputProps = Omit<InputProps, "onChange">;

type DataTableContentProps = HTMLAttributes<HTMLDivElement>;

const DataTable = <T extends Record<string, unknown>>({
  data,
  children,
  columns,
  rowAction,
}: PropsWithChildren<DataTableProps<T>>) => {
  return (
    <DataTableProvider rowAction={rowAction} data={data} columns={columns}>
      {children}
    </DataTableProvider>
  );
};

const DataTableContainer = ({
  children,
  className,
  ...props
}: DataTableContainerProps) => {
  return (
    <div {...props} className={cn("flex flex-col gap-6", className)}>
      {children}
    </div>
  );
};

const DataTableFilters = ({
  children,
  className,
  ...props
}: DataTableContainerProps) => {
  return (
    <div {...props} className={cn("flex justify-between gap-6", className)}>
      {children}
    </div>
  );
};

const DataTableContent = ({ className, ...props }: DataTableContentProps) => {
  const { table, columns, rowAction } = useDataTable();

  return (
    <div
      {...props}
      className={cn("border border-border rounded-md", className)}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    data-action={header.id === "actions"}
                    key={header.id}
                    className="data-[action=true]:w-[30px]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => rowAction(row.original)}
                className={cn(
                  index % 2 === 0 ? "bg-background" : "bg-secondary"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-96 text-center">
                <div className="mx-auto w-fit rounded-lg bg-secondary p-6">
                  <span className="text-xl font-medium text-secondary-foreground">
                    No results found
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const DataTableSearchInput = ({
  className,
  ...props
}: DataTableSearchInputProps) => {
  const { handleChange } = useDataTable();

  return (
    <Input
      placeholder="Pesquisar cardápios"
      {...props}
      onChange={handleChange}
      className={className}
    />
  );
};

export {
  type ColumnDef,
  DataTable,
  DataTableContainer,
  DataTableContent,
  DataTableFilters,
  DataTableSearchInput,
};
