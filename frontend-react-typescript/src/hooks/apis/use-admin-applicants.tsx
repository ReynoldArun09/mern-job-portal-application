import { useAdminActions, useAdminLoading, useApplicantsData } from "@/stores/useAdminStore";
import * as React from "react";

export default function useAdminApplicants(jobId: string) {
  const applicantsData = useApplicantsData();
  const isFetching = useAdminLoading();
  const { GetApplicantsData } = useAdminActions();

  React.useEffect(() => {
    GetApplicantsData(jobId);
  }, [GetApplicantsData, jobId]);

  return { isFetching, applicantsData };
}
