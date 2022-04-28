export interface UserConfig {
  width: number;
  index: number;
}

export interface DataTableColumn {
  key: string;
  text?: string;
  config: UserConfig;
  resizable?: boolean;
  sortable?: boolean;
  draggable?: boolean;
  header?: CustomComponent;
  cell?: CustomComponent;
}

export interface CustomComponent {
  component: any;
  class?: string;
}

export interface DataTableRow {
  id: string;
  [key: string]: any;
}

export type SortDirection = "up" | "down" | undefined;
export type DatatableStatus =
  | "loading"
  | "empty"
  | "error"
  | "success"
  | undefined;
