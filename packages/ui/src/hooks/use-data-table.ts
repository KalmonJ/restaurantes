import { useContext } from "react";

import type { DataTableContextProps } from "../context/data-table";
import { DataTableContext } from "../context/data-table";

export const useDataTable = <T extends Record<string, unknown>>() => {
  const context = useContext<DataTableContextProps<T>>(DataTableContext);
  if (!context) throw new Error("Missing DataTableProvider in dom tree!");

  return context;
};
