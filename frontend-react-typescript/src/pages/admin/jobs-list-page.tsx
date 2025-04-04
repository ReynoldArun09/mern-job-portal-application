import { DataTable } from "@/components/common/data-table";
import { JobsColumn } from "@/components/web/admin/admin-jobs/job-column";
import useAdminJobs from "@/hooks/apis/use-admin-jobs";
import Head from "@/utils/seo/head";

export default function JobsListPage() {
  const { adminJobsData } = useAdminJobs();

  return (
    <section>
      <Head title="Jobs List" description="job portal application, jobs list page" />
      <DataTable columns={JobsColumn} data={adminJobsData ?? []} filterName="title" />
    </section>
  );
}
