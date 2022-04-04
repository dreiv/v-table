import type {
  DataTableColumn,
  DataTableRow,
} from "@/ui/common/components/DataTable";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  shownRows: DataTableRow[];
  total: number;
}
