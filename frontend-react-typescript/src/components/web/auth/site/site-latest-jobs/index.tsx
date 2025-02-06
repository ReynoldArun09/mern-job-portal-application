import { useJobStore } from "@/stores/useJobStore";
import React from "react";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import JobCard from "@/components/common/job-card";

export default function SiteLatestJobs() {
  const { loading, jobs, getLatestJobs } = useJobStore();

  React.useEffect(() => {
    getLatestJobs();
  }, [getLatestJobs]);

  return (
    <section className="py-10">
      <h1 className="text-xl font-bold py-5 lg:text-2xl">Latest & Top Job Openings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
