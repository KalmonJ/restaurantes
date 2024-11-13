"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: string;
  price: number;
};

export const data: Product[] = [
  {
    id: 1,
    created_at: new Date(),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: "Prático típico",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    updated_at: new Date(),
    price: 29.9,
  },
  {
    id: 2,
    created_at: new Date(),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: "Prato do dia",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    updated_at: new Date(),
    price: 33.4,
  },
  {
    id: 3,
    created_at: new Date(),
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: "Cardápio do dia",
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    updated_at: new Date(),
    price: 19.9,
  },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "imagem",
    cell: ({ getValue, row }) => (
      <Image
        src={getValue<string>()}
        alt={row.original.name}
        width={55}
        height={55}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ getValue }) => (
      <span className="line-clamp-3 max-w-96 w-full/">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Preço",
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
