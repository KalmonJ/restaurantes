import { MenusTable } from "./components/menus-table";

export const Menus = () => {
  return (
    <div className="w-full p-3 flex h-full flex-col gap-6 rounded-lg bg-background flex-grow pt-6">
      <div className="flex flex-col max-w-lg gap-3">
        <h1 className="text-foreground font-normal text-4xl">Cardápios</h1>
        <p className="text-muted-foreground text-sm">
          Histórico de cardápios criados, aqui você pode escolher um cardápio já
          criado para a página principal que será exibida para o seu cliente.
        </p>
      </div>
      <MenusTable />
    </div>
  );
};
