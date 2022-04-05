import type {
  DataTableColumn,
  DataTableRow,
} from "@/ui/common/components/data-table";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  shownRows: DataTableRow[];
  total: number;
}
