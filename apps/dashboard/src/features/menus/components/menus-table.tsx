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
import { Button } from "@acme/ui/components/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const MenusTable = () => {
  const router = useRouter();

  return (
    <DataTable
      rowAction={(data) => router.push(`/cardapios/${data.id}`)}
      columns={columns}
      data={data}
    >
      <DataTableContainer className="gap-4xl flex h-full flex-col">
        <DataTableFilters>
          <DataTableSearchInput className="w-fit" />
          <Button>
            <Plus />
            Novo cardápio
          </Button>
        </DataTableFilters>
        <div className="gap-4xl flex w-full flex-col">
          <DataTableContent />
          <DataTablePagination totalPages={1} pageSize={10} />
        </div>
      </DataTableContainer>
    </DataTable>
  );
};
