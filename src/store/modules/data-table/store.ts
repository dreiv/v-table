import { defineStore } from "pinia";

import { setItem } from "@/helpers";
import { loadRecords } from "@/services";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
    totalRows: 0,
    rowsPerPage: 25,
    page: 1,
    totalPages: 0,
    sortBy: "",
  }),

  actions: {
    fetchPage(page: number) {
      const { records, total } = loadRecords(
        (page - 1) * this.rowsPerPage,
        this.rowsPerPage
      );

      this.page = page;
      this.totalPages = Math.ceil(total / this.rowsPerPage);
      this.rows = records;
      this.totalRows = total;
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
      this.columns = cols.sort((a, b) => a.config!.index - b.config!.index);
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
