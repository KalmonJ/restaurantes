"use client";

import { DataTablePagination } from "@acme/ui/data-table/data-table-pagination";
import {
  DataTable,
  DataTableContainer,
  DataTableContent,
  DataTableSearchInput,
  DataTableFilters,
} from "@acme/ui/data-table/index";

import { columns, data } from "./columns";
import { useRouter } from "next/navigation";

export const OrdersTable = () => {
  const router = useRouter();

  return (
    <DataTable
      rowAction={(data) => router.push(`/pedidos/${data.id}`)}
      columns={columns}
      data={data}
    >
      <DataTableContainer className="gap-4xl flex h-full flex-col">
        <DataTableFilters>
          <DataTableSearchInput
            placeholder="Pesquisar pedidos"
            className="w-fit"
          />
        </DataTableFilters>
        <div className="gap-4xl flex w-full flex-col">
          <DataTableContent />
          <DataTablePagination totalPages={1} pageSize={10} />
        </div>
      </DataTableContainer>
    </DataTable>
  );
};
