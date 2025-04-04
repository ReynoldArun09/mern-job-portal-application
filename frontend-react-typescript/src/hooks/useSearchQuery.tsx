import { useQueryState } from "nuqs";

export default function useSearchQuery() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  return {
    search,
    setSearch,
  };
}
