import { shallowRef } from "vue";
import { getItem } from "@/helpers";

import { CheckMarkHeader, CheckMarkRow, DataTableColumn } from "@/ui/common";
import type { SavedConfig } from "./types";

export const USER_CONFIG = "user-config";
const defaultColumns: DataTableColumn[] = [
  {
    key: "select",
    config: {
      width: 40,
      index: 0,
    },
    header: {
      component: shallowRef(CheckMarkHeader),
      class: "dt-check-mark-header",
    },
    cell: {
      component: shallowRef(CheckMarkRow),
    },
  },
  {
    key: "company",
    text: "Company",
    config: {
      width: 140,
      index: 1,
    },
    resizable: true,
    sortable: true,
    draggable: true,
  },
  {
    key: "contact",
    text: "Contact",
    config: {
      width: 120,
      index: 2,
    },
    resizable: true,
    sortable: true,
    draggable: true,
  },
  {
    key: "email",
    text: "Email",
    config: {
      width: 256,
      index: 3,
    },
    resizable: true,
    draggable: true,
  },
  {
    key: "phone",
    text: "Phone",
    config: {
      width: 96,
      index: 4,
    },
    resizable: true,
    sortable: true,
    draggable: true,
  },
  {
    key: "country",
    text: "Country",
    config: {
      width: 140,
      index: 5,
    },
    resizable: true,
    draggable: true,
  },
  {
    key: "city",
    text: "City",
    config: {
      width: 148,
      index: 6,
    },
    resizable: true,
    draggable: true,
  },
  {
    key: "street",
    text: "Street",
    config: {
      width: 96,
      index: 7,
    },
    resizable: true,
    draggable: true,
  },
];

const storedConfig = getItem<SavedConfig[]>(USER_CONFIG);
export const storedColumns = storedConfig
  ? (defaultColumns
      .map((col) => ({
        ...col,
        config: storedConfig.find(({ key }) => key === col.key)?.config,
      }))
      .sort((a, z) => a.config!.index - z.config!.index) as DataTableColumn[])
  : defaultColumns;
