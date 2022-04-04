export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  shownRows: DataTableRow[];
  total: number;
}

export interface DataTableColumn {
  key: string;
  text: string;
  config: UserConfig;
}

export interface DataTableRow {
  id: string;
  [key: string]: any;
}

export interface UserConfig {
  width: number;
  index: number;
}
