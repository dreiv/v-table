export interface UserConfig {
  width: number;
  index: number;
}

export interface DataTableColumn {
  key: string;
  text: string;
  config: UserConfig;
  resizable: boolean;
}

export interface DataTableRow {
  id: string;
  [key: string]: any;
}
