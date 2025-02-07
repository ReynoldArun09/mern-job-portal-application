import { useAdminStore } from "@/stores/useAdminStore";
import * as React from "react";

export default function useAdminApplicants(jobId: string) {
  const { isFetching, GetApplicantsData, applicantsData } = useAdminStore();

  React.useEffect(() => {
    GetApplicantsData(jobId);
  }, [GetApplicantsData, jobId]);

  return { isFetching, applicantsData };
}
