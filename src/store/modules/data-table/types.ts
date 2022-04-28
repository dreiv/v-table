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
  allRowsByIds: RowById;
  allGroups: RowGrouped;
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

export interface RowById {
  [key: string]: {
    group: string;
    selected: boolean;
  };
}

export interface RowGrouped {
  [key: string]: {
    rows: string[];
    selected: boolean;
  };
}
