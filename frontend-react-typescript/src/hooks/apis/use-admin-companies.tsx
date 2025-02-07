import { useAdminStore } from "@/stores/useAdminStore";
import * as React from "react";

export default function useAdminCompanies() {
  const { isFetching, GetAdminCompanies, adminCompaniesData } = useAdminStore();

  React.useEffect(() => {
    GetAdminCompanies();
  }, [GetAdminCompanies]);

  return { isFetching, adminCompaniesData };
}
