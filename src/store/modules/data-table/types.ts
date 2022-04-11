import type {
  DataTableColumn,
  DataTableRow,
  SortDirection,
  UserConfig,
} from "@/ui/common/components/data-table";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  totalRows: number;
  pageSize: number;
  page: number;
  totalPages: number;
  groupBy: string;
  sortBy: string;
  sortDirection: SortDirection;
  status: DatatableStatus;
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}

export type DatatableStatus = "loading" | "empty" | "error" | "success";
