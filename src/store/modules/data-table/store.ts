import { defineStore } from "pinia";

import { clone, debouncedThrottle } from "@/helpers";
import { loadRecords } from "@/services";
import { DataTableColumn, SortDirection } from "@/ui/common";

import { storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

let controller: AbortController;
const lazyLoadRecords = debouncedThrottle(loadRecords);

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
    allRowsByIds: {},
    allGroups: {},
    pageSize: 50,
    page: 1,
    totalPages: 0,
    groupBy: "type",
    filter: "",
    sortBy: "",
    sortDirection: undefined,
    status: undefined,
  }),

  actions: {
    async fetchPage(page: number, withAllIds = false) {
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
            withAllIds,
          }
        );

        if (ids) {
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

          this.allGroups = rowGroups.reduce(
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

        this.status = records.length ? "success" : "empty";
      } catch (error: any) {
        if (error === "Aborted") {
          this.status = "error";
        }
      }
    },

    resizeColumn(key: string, diff: number) {
      this.columnsByKey[key].config.width += diff;
    },

    swapColumns(from: string, to: string) {
      let fromCfg, toCfg;
      const cols = this.columns.reduce(
        (acc: DataTableColumn[], { config, ...col }) => {
          const clone = {
            ...col,
            config: { ...config },
          };
          acc.push(clone);

          if (col.key === from) fromCfg = clone.config;
          if (col.key === to) toCfg = clone.config;

          return acc;
        },
        []
      );

      // @ts-ignore: Object is possibly 'null'.
      [fromCfg.index, toCfg.index] = [toCfg.index, fromCfg.index];
      this.columns = cols.sort((a, z) => a.config!.index - z.config!.index);
    },

    sort(key: string, direction: SortDirection) {
      this.sortDirection = direction;
      this.sortBy = key;

      this.fetchPage(this.page);
    },

    filterBy(value: string) {
      this.filter = value;
      this.fetchPage(1, true);
    },

    selectRow(id: string, checked: boolean) {
      const row = this.allRowsByIds[id];
      const group = this.allGroups[row.group];

      row.selected = checked;
      group.selected = group.rows.every(
        (row) => this.allRowsByIds[row].selected
      );
    },

    selectGroup(targetGroup: string, checked: boolean) {
      const group = this.allGroups[targetGroup];
      const rows = clone(this.allRowsByIds);

      group.selected = checked;
      group.rows.forEach((id) => {
        rows[id].selected = checked;
      });

      this.allRowsByIds = rows;
    },

    selectAll(checked: boolean) {
      const groups = clone(this.allGroups);
      const rows = clone(this.allRowsByIds);

      Object.values(groups).forEach((group) => (group.selected = checked));
      Object.values(rows).forEach((row) => (row.selected = checked));

      this.allGroups = groups;
      this.allRowsByIds = rows;
    },
  },

  getters: {
    columnsByKey: ({ columns }) =>
      columns.reduce((acc: any, item) => {
        acc[item.key] = item;

        return acc;
      }, {}),
    isLoading: ({ status }) => status === "loading",
  },
});
