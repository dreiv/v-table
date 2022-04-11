import { groupBy } from "@/helpers";
import { collator } from "./colator";

export function groupRecords(records: any, by: string) {
  return Object.entries(groupBy(records, by))
    .sort((a, z) => collator.compare(a[0], z[0]))
    .reduce((acc, group: any) => acc.concat(group[1]), []);
}
