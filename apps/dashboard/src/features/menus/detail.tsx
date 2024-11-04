"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/components/select";
import { Badge } from "@acme/ui/components/badge";
import { ScrollArea } from "@acme/ui/components/scroll-area";
import { Input } from "@acme/ui/components/input";
import { Textarea } from "@acme/ui/components/textarea";
import { Button } from "@acme/ui/components/button";
import { Plus, Trash2, Save, Eye, CloudUpload } from "lucide-react";

const products: Product[] = [
  {
    id: 1,
    name: "Strogonoff",
    description: "Strogonoff de frango com creme de leite.",
    image: "",
    price: 28,
    time: 20,
  },
  {
    id: 2,
    name: "Strogonoff de carne",
    description: "Strogonoff de carne bovina com creme de leite.",
    image: "",
    price: 28,
    time: 20,
  },
  {
    id: 3,
    name: "Strogonoff de camarão",
    description: "Strogonoff de camarão com creme de leite.",
    image: "",
    price: 28,
    time: 20,
  },
];

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  time: z.number(),
});

export const menuSchema = z.object({
  name: z.string(),
  description: z.string(),
  products: z.array(productSchema),
});

type Product = z.infer<typeof productSchema>;

type FormSchema = z.infer<typeof menuSchema>;

export const Detail = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(menuSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  console.log(form.getValues());

  return (
    <div className="w-full p-3 flex h-full flex-col gap-6 overflow-auto rounded-lg bg-background flex-grow pt-6">
      <div className="flex w-full items-center justify-between self-end">
        <div className="flex gap-4">
          <h2 className="font-bold">Nome do cardápio</h2>
          <Badge>ao vivo</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <CloudUpload />
            Publicar
          </Button>
          <Button>
            <Eye />
            Visualizar
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Excluir
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form className="flex flex-col h-full gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do cardápio</FormLabel>
                <FormControl>
                  <Input placeholder="Cardápio do dia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do cardápio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cardápio do dia, contendo os principais pratos da loja."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr />
          <div className="flex flex-col h-full gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-primary">Produtos do cardápio</h2>
              <p className="text-muted-foreground text-sm">
                Listagem de produtos do cardápio, você pode adicionar ou excluir
                um item do seu cardápio.
              </p>
            </div>
            <Button
              type="button"
              className="w-fit"
              onClick={() => {
                append({
                  image: "",
                  description: "",
                  time: 33,
                  id: 2,
                  name: "sadsd",
                  price: 444,
                });
              }}
            >
              <Plus />
              Adicinar produto
            </Button>
            <ScrollArea className="min-h-72 bg-muted rounded-md max-h-72">
              <div className="p-3 flex h-full flex-col gap-4">
                {fields.map((field, i) => (
                  <div className="flex items-center gap-4" key={field.id}>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem
                            key={product.id}
                            value={product.id.toString()}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => {
                        remove(i);
                      }}
                      variant="destructive"
                      type="button"
                    >
                      <Trash2 className="text-lg" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <Button className="self-end w-fit justify-self-end">
            <Save />
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
};
