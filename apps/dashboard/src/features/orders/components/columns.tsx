"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type Order = {
  id: number;
  description: string;
  table_number: number;
  created_at: Date;
  updated_at: Date;
  is_new: boolean;
  quantity: number;
  menu_id: number;
  product_id: number;
};

// TODO: um pedido pode conter vários produtos

export const data: Order[] = [
  {
    id: 1,
    created_at: new Date(),
    description: "lorem",
    updated_at: new Date(),
    menu_id: 3,
    is_new: true,
    quantity: 5,
    table_number: 44,
    product_id: 3,
  },
  {
    id: 2,
    created_at: new Date(),
    description: "lorem",
    updated_at: new Date(),
    menu_id: 3,
    is_new: false,
    quantity: 1,
    table_number: 44,
    product_id: 3,
  },
  {
    id: 3,
    created_at: new Date(),
    description: "lorem",
    updated_at: new Date(),
    menu_id: 3,
    is_new: true,
    quantity: 3,
    table_number: 44,
    product_id: 3,
  },
];

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Número do pedido",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "table_number",
    header: "Número da mesa",
  },
  {
    accessorKey: "created_at",
    header: "Horario do pedido",
    cell: ({ getValue }) => (
      <span className="text-sm text-foreground">
        {getValue<Date>()
          .toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .split(", ")
          .at(1)}
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
