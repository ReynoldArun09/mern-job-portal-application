import { useQueryState } from "nuqs";

export default function useFilterQuery() {
  const [filter, setFilter] = useQueryState("filter", { defaultValue: "" });
  return {
    filter,
    setFilter,
  };
}
