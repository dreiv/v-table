import { DataTableColumn } from "@/ui/common";

export const defaultColumns: DataTableColumn[] = [
  {
    key: "company",
    text: "Company",
    config: {
      width: 140,
      index: 0,
    },
    resizable: true,
  },
  {
    key: "contact",
    text: "Contact",
    config: {
      width: 120,
      index: 1,
    },
    resizable: true,
  },
  {
    key: "email",
    text: "Email",
    config: {
      width: 256,
      index: 2,
    },
    resizable: true,
  },
  {
    key: "phone",
    text: "Phone",
    config: {
      width: 96,
      index: 3,
    },
    resizable: true,
  },
  {
    key: "country",
    text: "Country",
    config: {
      width: 140,
      index: 4,
    },
    resizable: true,
  },
  {
    key: "city",
    text: "City",
    config: {
      width: 148,
      index: 5,
    },
    resizable: true,
  },
  {
    key: "street",
    text: "Street",
    config: {
      width: 96,
      index: 6,
    },
    resizable: true,
  },
];
