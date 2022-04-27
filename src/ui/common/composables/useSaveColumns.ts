import { setItem } from "@/helpers";
import { USER_CONFIG, useDataTableStore } from "@/store";

export function useSaveColumns() {
  const store = useDataTableStore();

  window.addEventListener("beforeunload", () => {
    setItem(
      USER_CONFIG,
      store.columns.map(({ key, config }) => ({ key, config }))
    );
  });
}
