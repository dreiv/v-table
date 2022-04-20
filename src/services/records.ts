import { records } from "./mocks";
import { sortByDirection, groupRecords } from "./helpers";

export async function loadRecords(
  page: number,
  pageSize: number,
  { withAllIds, sortBy, sortDirection, groupBy, filter, signal }: any = {}
): Promise<any> {
  if (signal?.aborted) {
    return Promise.reject("Aborted");
  }

  return new Promise((resolve, reject) => {
    const offset = (page - 1) * pageSize;
    const auxiliary = {} as any;
    let res = records;
    let groups;

    if (filter) {
      res = res.filter(({ type }) =>
        type.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sortBy) {
      res.sort(sortByDirection(sortDirection, sortBy));
    }

    if (groupBy) {
      [groups, res] = groupRecords(res, groupBy);
    }

    if (withAllIds) {
      auxiliary.ids = res.map(({ id }) => id);
      auxiliary.groups = groups;
    }

    const data = {
      ...auxiliary,
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
