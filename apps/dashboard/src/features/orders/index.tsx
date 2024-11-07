import { OrdersKanban } from "./components/orders-kanban";

export const Orders = () => {
  return (
    <div className="w-full p-3 flex h-full flex-col gap-6 rounded-lg bg-background flex-grow pt-6">
      <div className="flex flex-col max-w-lg gap-3">
        <h1 className="text-foreground font-bold text-4xl">Pedidos</h1>
      </div>
      <OrdersKanban />
    </div>
  );
};
