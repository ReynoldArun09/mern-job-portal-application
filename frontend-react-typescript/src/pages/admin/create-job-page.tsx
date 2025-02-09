import CreateJobForm from "@/components/web/admin/admin-jobs/create-job-form";
import Head from "@/utils/seo/head";

export default function CrateJobPage() {
  return (
    <>
      <Head title="Create job" description="job portal application, create job page" />
      <section>
        <CreateJobForm />
      </section>
    </>
  );
}
