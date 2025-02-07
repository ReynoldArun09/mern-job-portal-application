import { DataTable } from "@/components/common/data-table";
import { ApplicantsColumn } from "@/components/web/admin/admin-applicants/applicants-column";
import useAdminApplicants from "@/hooks/apis/use-admin-applicants";
import { useParams } from "react-router-dom";

export default function ApplicantsListPage() {
  const { id } = useParams<{ id: string }>();

  const { applicantsData } = useAdminApplicants(id!);
  return (
    <section>
      <DataTable columns={ApplicantsColumn} data={applicantsData ?? []} filterName="fullname" />
    </section>
  );
}
