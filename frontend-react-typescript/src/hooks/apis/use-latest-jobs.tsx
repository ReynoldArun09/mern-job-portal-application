import { useJobStore } from "@/stores/useJobStore";
import * as React from "react";

export default function UseLatestJobs() {
  const { isFetching, GetLatestJobs, latestJobsData } = useJobStore();

  React.useEffect(() => {
    GetLatestJobs();
  }, [GetLatestJobs]);

  return { isFetching, latestJobsData };
}
