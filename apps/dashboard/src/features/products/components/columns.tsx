"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type Menu = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  num_dishes: number;
};

export const data: Menu[] = [
  {
    id: 1,
    created_at: new Date(),
    description: "lorem",
    name: "Cardápio do dia",
    num_dishes: 44,
    updated_at: new Date(),
  },
  {
    id: 2,
    created_at: new Date(),
    description: "lorem",
    name: "Cardápio do dia",
    num_dishes: 44,
    updated_at: new Date(),
  },
  {
    id: 3,
    created_at: new Date(),
    description: "lorem",
    name: "Cardápio do dia",
    num_dishes: 44,
    updated_at: new Date(),
  },
];

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "num_dishes",
    header: "Numero de items",
  },
  {
    accessorKey: "created_at",
    header: "Criado em",
    cell: ({ getValue }) => (
      <span className="text-sm text-foreground">
        {getValue<Date>().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Atualizado em",
    cell: ({ getValue }) => (
      <span className="text-sm text-foreground">
        {getValue<Date>().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "action",
    cell: ({}) => (
      <div className="flex items-center gap-2">
        <MoreHorizontal />
        {/* <Pencil size={16} />
        <Trash2 size={16} />
        <Eye size={16} /> */}
      </div>
    ),
  },
];
