import { DataTable } from "@/components/common/data-table";
import { JobsColumn } from "@/components/web/admin/admin-jobs/job-column";
import UseAdminJobs from "@/hooks/apis/use-admin-jobs";

export default function JobsListPage() {
  const { adminJobsData } = UseAdminJobs();

  return (
    <section>
      <DataTable columns={JobsColumn} data={adminJobsData ?? []} filterName="title" />
    </section>
  );
}
