import { useAdminActions, useAdminCompaniesData, useAdminLoading } from "@/stores/useAdminStore";
import * as React from "react";

export default function useAdminCompanies() {
  const adminCompaniesData = useAdminCompaniesData();

  const isFetching = useAdminLoading();
  const { GetAdminCompanies } = useAdminActions();

  React.useEffect(() => {
    GetAdminCompanies();
  }, [GetAdminCompanies]);

  return { isFetching, adminCompaniesData };
}
