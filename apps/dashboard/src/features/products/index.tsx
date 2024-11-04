import { ProductsTable } from "./components/products-table";

export const Products = () => {
  return (
    <div className="w-full p-3 flex h-full flex-col gap-6 rounded-lg bg-background flex-grow pt-6">
      <div className="flex flex-col max-w-lg gap-3">
        <h1 className="text-foreground font-normal text-4xl">Produtos</h1>
        <p className="text-muted-foreground text-sm">
          Produtos cadastrados no sistema.
        </p>
      </div>
      <ProductsTable />
    </div>
  );
};
