import type {
  DataTableColumn,
  DatatableStatus,
  DataTableRow,
  SortDirection,
  UserConfig,
} from "@/ui/common/components/data-table";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowsSelection: boolean[];
  totalRows: number;
  pageSize: number;
  page: number;
  totalPages: number;
  groupBy: string;
  filter: string;
  sortBy: string;
  sortDirection: SortDirection;
  status: DatatableStatus;
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}
