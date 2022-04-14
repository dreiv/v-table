import { records } from "./mocks";
import { sortByDirection, groupRecords } from "./helpers";

export function loadRecords(
  page: number,
  pageSize: number,
  { sortBy, sortDirection, groupBy, filter, signal }: any = {}
): any {
  if (signal?.aborted) {
    return Promise.reject("Aborted");
  }

  return new Promise((resolve, reject) => {
    const offset = (page - 1) * pageSize;
    let res = records;

    if (filter) {
      res = res.filter(({ type }) => type.includes(filter));
    }

    if (sortBy) {
      res.sort(sortByDirection(sortDirection, sortBy));
    }

    if (groupBy) {
      res = groupRecords(res, groupBy);
    }

    const data = {
      records: res.slice(offset, offset + pageSize),
      total: res.length,
    };

    const timeout = setTimeout(() => resolve(data), Math.random() * 500 + 300);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeout);

        reject("Aborted");
      });
    }
  });
}
