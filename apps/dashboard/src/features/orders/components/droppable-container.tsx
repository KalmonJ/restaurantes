"use client";

import { useDroppable } from "@dnd-kit/core";
import { HTMLAttributes } from "react";
import { CONTAINER_MAPPER } from "../constants/container-mapper";
import { Button } from "@acme/ui/components/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/components/form";
import { useForm } from "react-hook-form";
import { Input } from "@acme/ui/components/input";

type DroppableContainerProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
};

export const DroppableContainer = (props: DroppableContainerProps) => {
  const { setNodeRef } = useDroppable({ id: props.id });
  const form = useForm({});

  return (
    <div
      className="bg-slate-200 shadow-inner rounded-md space-y-4 p-3"
      ref={setNodeRef}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl text-foreground font-normal">
          {CONTAINER_MAPPER[props.id as keyof typeof CONTAINER_MAPPER]}
        </h3>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar novo pedido</DialogTitle>
              <DialogDescription>
                Cadastre um novo pedido adicionando as informações necessárias.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="flex flex-col gap-4">
                <FormField
                  name="table_number"
                  control={form.control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Numero da mesa (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="44" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="customer_name"
                  control={form.control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Nome do cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="order"
                  control={form.control}
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Selecione o produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <DialogClose>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {props.children}
    </div>
  );
};
