import { InjectionKey, Ref } from "vue";
import type {
  DataTableColumn,
  DataTableRow,
  DatatableStatus,
  SortDirection,
} from "./types";

export interface DataTableContext {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  groupBy?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
  status?: DatatableStatus;
  onSort: (key: string, direction: SortDirection) => void;
  onResize: (key: string, diff: number) => void;
  onSwap: (from: string, to: string) => void;
}

export const DataTableKey: InjectionKey<Ref<DataTableContext>> = Symbol(
  "DataTable state provider identifier"
);
