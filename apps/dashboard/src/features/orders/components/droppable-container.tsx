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
import { RadioGroup, RadioGroupItem } from "@acme/ui/components/radio-group";
import { useForm } from "react-hook-form";
import { Input } from "@acme/ui/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type DroppableContainerProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
};

const formSchema = z.object({
  tableNumber: z.string({ message: "Numero da mesa é obrigatório" }),
  customerName: z.string({ message: "Nome do cliente é obrigatório" }),
  orderType: z.enum(["delivery", "in_person"], {
    message: "Selecione uma opção válida",
  }),
  orderProducts: z.array(z.number()),
});

type FormValues = z.infer<typeof formSchema>;

export const DroppableContainer = (props: DroppableContainerProps) => {
  const { setNodeRef } = useDroppable({ id: props.id });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    criteriaMode: "all",
    mode: "all",
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

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
          <DialogTrigger asChild>
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
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  name="tableNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero da mesa (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="44" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="customerName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do cliente*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jhon doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="orderType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo do pedido</FormLabel>
                      <FormControl>
                        <RadioGroup {...field}>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="delivery" />
                            </FormControl>
                            <FormLabel>Entrega</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="in_person" />
                            </FormControl>
                            <FormLabel>Presencial</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <Button>Adicionar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {props.children}
    </div>
  );
};
