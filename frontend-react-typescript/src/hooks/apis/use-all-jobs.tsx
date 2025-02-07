import { useJobStore } from "@/stores/useJobStore";
import * as React from "react";

export default function UseAllJobs(query?: string) {
  const { isFetching, GetAllJobs, allJobsData } = useJobStore();

  React.useEffect(() => {
    GetAllJobs(query ?? "");
  }, [GetAllJobs, query]);

  return { isFetching, allJobsData };
}
