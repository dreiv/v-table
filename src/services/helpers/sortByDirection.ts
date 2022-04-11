import { SortDirection } from "@/ui/common";
import { collator } from "./colator";

export const sortByDirection =
  (sortDirection: SortDirection, key: string) => (a: any, b: any) =>
    sortDirection === "up"
      ? collator.compare(a[key], b[key])
      : collator.compare(b[key], a[key]);
