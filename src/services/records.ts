import { records } from "./mocks";

const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});
const sorted = records.sort((a, z) => collator.compare(a.type, z.type));

export function loadRecords(start: number, count: number): any {
  return {
    records: sorted.slice(start, start + count),
    total: sorted.length,
  };
}
