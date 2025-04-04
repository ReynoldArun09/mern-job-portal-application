import { useAdminActions, useAdminJobsData, useAdminLoading } from "@/stores/useAdminStore";
import * as React from "react";

export default function UseAdminJobs() {
  const adminJobsData = useAdminJobsData();
  const isFetching = useAdminLoading();
  const { GetAdminPostedJobs } = useAdminActions();

  React.useEffect(() => {
    GetAdminPostedJobs();
  }, [GetAdminPostedJobs]);

  return { isFetching, adminJobsData };
}
