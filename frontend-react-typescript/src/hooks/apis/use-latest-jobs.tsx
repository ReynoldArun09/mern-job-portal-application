import { useJobFetching, useJobsActions, useLatestJobData } from "@/stores/useJobStore";
import { useEffect } from "react";

export default function UseLatestJobs() {
  const latestJobsData = useLatestJobData();
  const isFetching = useJobFetching();
  const { GetLatestJobs } = useJobsActions();

  useEffect(() => {
    GetLatestJobs();
  }, [GetLatestJobs]);

  return { isFetching, latestJobsData };
}
