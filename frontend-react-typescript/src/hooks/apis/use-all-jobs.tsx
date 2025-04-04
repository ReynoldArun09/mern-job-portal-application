import { useAllJobData, useJobFetching, useJobsActions } from "@/stores/useJobStore";
import { useEffect } from "react";

export default function UseAllJobs(query?: string) {
  const allJobsData = useAllJobData();
  const isFetching = useJobFetching();
  const { GetAllJobs } = useJobsActions();

  useEffect(() => {
    GetAllJobs(query ?? "");
  }, [GetAllJobs, query]);

  return { isFetching, allJobsData };
}
