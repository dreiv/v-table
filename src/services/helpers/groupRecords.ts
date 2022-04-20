import { groupBy } from "@/helpers";
import { collator } from "./colator";

export function groupRecords(records: any, by: string): any {
  const grouped: [string, any][] = Object.entries(groupBy(records, by)).sort(
    (a, z) => collator.compare(a[0], z[0])
  );

  return [
    grouped.map(([group, rows]) => ({ group, rowsTotal: rows.length })),
    grouped.reduce((acc, group: any) => acc.concat(group[1]), []),
  ];
}
