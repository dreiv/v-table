import type {
  DataTableColumn,
  DataTableRow,
} from "@/ui/common/components/data-table";

export interface DataTableState {
  columns: DataTableColumn[];
  rowsPerPage: number;
  rows: DataTableRow[];
  totalRows: number;
  page: number;
  totalPages: number;
}
