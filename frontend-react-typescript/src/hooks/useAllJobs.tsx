import React from "react";
import { useJobStore } from "../stores/useJobStore";

export default function useAllJobs() {
  const { getAllJobs } = useJobStore();

  React.useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);
}
