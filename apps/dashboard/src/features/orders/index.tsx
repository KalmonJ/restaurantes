import { OrdersTable } from "./components/orders-table";

export const Orders = () => {
  return (
    <div className="w-full p-3 flex h-full flex-col gap-6 rounded-lg bg-background flex-grow pt-6">
      <div className="flex flex-col max-w-lg gap-3">
        <h1 className="text-foreground font-normal text-4xl">Pedidos</h1>
        <p className="text-muted-foreground text-sm">
          Tabela de pedidos dos seus clientes.
        </p>
      </div>
      <OrdersTable />
    </div>
  );
};
