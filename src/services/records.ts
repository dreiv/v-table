import { records } from "./mocks";
import { sortByDirection, groupRecords } from "./helpers";

export function loadRecords(
  page: number,
  pageSize: number,
  { sortBy, sortDirection, groupBy }: any = {}
): any {
  const offset = (page - 1) * pageSize;

  let res = records;

  if (sortBy) {
    res.sort(sortByDirection(sortDirection, sortBy));
  }

  if (groupBy) {
    res = groupRecords(records, groupBy);
  }

  return {
    records: res.slice(offset, offset + pageSize),
    total: res.length,
  };
}
