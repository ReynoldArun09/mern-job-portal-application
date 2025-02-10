import BreadCrumbs from "@/components/common/bread-crumb";
import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import UseAllJobs from "@/hooks/apis/use-all-jobs";
import Head from "@/utils/seo/head";

export default function BrowsePage() {
  const { isFetching, allJobsData } = UseAllJobs();

  return (
    <>
      <Head title="Search Page" description="job portal application, Search page" />
      <BreadCrumbs />
      <section className="container mx-auto py-10 min-h-screen">
        <h1 className="font-bold text-2xl py-3">Search Results ({allJobsData?.length})</h1>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetching && [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
          {allJobsData?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>
    </>
  );
}
