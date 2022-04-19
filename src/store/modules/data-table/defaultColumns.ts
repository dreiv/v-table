import { DataTableColumn } from "@/ui/common";

export const defaultColumns: DataTableColumn[] = [
  {
    key: "select",
    text: "Select",
    config: {
      width: 40,
      index: 0,
    }
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
