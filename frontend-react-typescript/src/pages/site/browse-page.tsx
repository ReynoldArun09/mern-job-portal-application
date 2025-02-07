import * as React from "react";
import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import { useJobStore } from "@/stores/useJobStore";

export default function BrowsePage() {
  const { jobs, loading, getAllJobs, searchQuery } = useJobStore();

  React.useEffect(() => {
    getAllJobs(searchQuery);
  }, [getAllJobs, searchQuery]);

  return (
    <section className="container mx-auto py-10 min-h-screen">
      <h1 className="font-bold text-2xl py-3">Search Results ({jobs?.length})</h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {!loading && jobs?.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </section>
  );
}
