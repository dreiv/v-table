import { defineStore } from "pinia";

import { debouncedThrottle, setItem } from "@/helpers";
import { loadRecords } from "@/services";
import { SortDirection } from "@/ui/common";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

let controller: AbortController;
const lazyLoadRecords = debouncedThrottle(loadRecords);
export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
    allRowsByIds: {},
    allRowsGrouped: {},
    totalRows: 0,
    pageSize: 25,
    page: 1,
    totalPages: 0,
    groupBy: "type",
    filter: "",
    sortBy: "",
    sortDirection: undefined,
    status: undefined,
  }),

  actions: {
    async fetchPage(page: number) {
      if (controller) controller.abort();
      controller = new AbortController();
      this.status = "loading";

      try {
        const { records, total, groups, ids } = await lazyLoadRecords(
          page,
          this.pageSize,
          {
            sortBy: this.sortBy,
            sortDirection: this.sortDirection,
            groupBy: this.groupBy,
            filter: this.filter,
            signal: controller.signal,
            withAllIds: true, // TODO: only on first load an filter
          }
        );

        if (ids) {
          this.totalRows = ids.length;
          const rowGroups = groups.reduce(
            (acc: any, { group, rowsTotal }: any) =>
              acc.concat(Array.from({ length: rowsTotal }, () => group)),
            []
          );

          this.allRowsByIds = ids.reduce(
            (acc: any, id: string, idx: number) => {
              acc[id] = { group: rowGroups[idx], selected: true };

              return acc;
            },
            {}
          );

          this.allRowsGrouped = rowGroups.reduce(
            (acc: any, group: string, idx: number) => {
              if (!acc[group]) acc[group] = { rows: [], selected: true };
              acc[group].rows.push(ids[idx]);

              return acc;
            },
            {}
          );
        }

        this.page = page;
        this.totalPages = Math.ceil(total / this.pageSize);
        this.rows = records;
        this.totalRows = total;

        this.status = records.length ? "success" : "empty";
      } catch (error: any) {
        if (error === "Aborted") {
          this.status = "error";
        }
      }
    },

    resizeColumn(key: string, diff: number) {
      const cols = [...this.columns];
      const resizedCfg = cols.find((c) => key === c.key)!.config;
      resizedCfg.width += diff;

      this.columns = cols;
    },

    swapColumns(from: string, to: string) {
      const cols = [...this.columns];
      const fromCfg = cols.find(({ key }) => key === from)!.config;
      const toCfg = cols.find(({ key }) => key === to)!.config;

      [fromCfg.index, toCfg.index] = [toCfg.index, fromCfg.index];
      this.columns = cols.sort((a, z) => a.config!.index - z.config!.index);
    },

    sort(key: string, direction: SortDirection) {
      this.sortDirection = direction;
      this.sortBy = key;

      this.fetchPage(this.page);
    },

    persistOnUnload() {
      window.addEventListener("beforeunload", () => {
        setItem(
          USER_CONFIG,
          this.columns.map(({ key, config }) => ({ key, config }))
        );
      });
    },
  },
});
