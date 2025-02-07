import { useAdminStore } from "@/stores/useAdminStore";
import * as React from "react";

export default function UseAdminJobs() {
  const { isFetching, GetAdminPostedJobs, adminJobsData } = useAdminStore();

  React.useEffect(() => {
    GetAdminPostedJobs();
  }, [GetAdminPostedJobs]);

  return { isFetching, adminJobsData };
}
