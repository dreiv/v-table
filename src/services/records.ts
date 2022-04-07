import { records } from "./mocks";

export function loadRecords(start: number, count: number): any {
  return {
    records: records.slice(start, start + count),
    total: records.length
  }
}
