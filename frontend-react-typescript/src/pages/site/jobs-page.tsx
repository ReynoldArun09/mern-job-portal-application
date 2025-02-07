import { useJobStore } from "@/stores/useJobStore";
import React from "react";
import JobCard from "../../components/common/job-card";
import FilterJobsCard from "../../components/common/filter-jobs-card";
import useAllJobs from "../../hooks/useAllJobs";

export default function JobsPage() {
  const { jobs, searchQuery } = useJobStore();
  const [filterJobs, setFilterJobs] = React.useState(jobs);
  useAllJobs();

  React.useEffect(() => {
    if (jobs) {
      if (searchQuery) {
        const filteredData = jobs.filter((job) => {
          return (
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setFilterJobs(filteredData);
      } else {
        setFilterJobs(jobs);
      }
    }
  }, [jobs, searchQuery]);

  return (
    <section>
      <div className="flex gap-x-10">
        <div>
          <FilterJobsCard />
        </div>
        {filterJobs && filterJobs.length <= 0 ? (
          <span className="flex items-center justify-center mx-auto text-blue-600 font-bold text-3xl">Jobs Not Found</span>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filterJobs?.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
