import JobCard from "@/components//common/job-card";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import UseLatestJobs from "@/hooks/apis/use-latest-jobs";

export default function SiteLatestJob() {
  const { isFetching, latestJobsData } = UseLatestJobs();
  return (
    <section className="py-10">
      <h1 className="text-xl font-bold py-5 lg:text-2xl">Latest & Top Job Openings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isFetching && [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {latestJobsData?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
