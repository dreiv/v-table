import type {
  DataTableColumn,
  DataTableRow,
  UserConfig,
} from "@/ui/common/components/data-table";

export interface DataTableState {
  columns: DataTableColumn[];
  rowsPerPage: number;
  rows: DataTableRow[];
  totalRows: number;
  page: number;
  totalPages: number;
  sortBy: string;
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}
