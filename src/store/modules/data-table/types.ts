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
  rowsPerPage: number;
  page: number;
  totalPages: number;
  sortBy: string;
  sortDirection: SortDirection
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}
