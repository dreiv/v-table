import { defineStore } from "pinia";

import { setItem } from "@/helpers";
import { loadRecords } from "@/services";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
    shownRows: [],
    total: 0,
  }),

  actions: {
    fetchRows(offset: number, count: number) {
      return loadRecords(offset, count);
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
