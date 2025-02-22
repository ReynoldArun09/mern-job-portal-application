import { JobType } from "@/stores/types";
import { ColumnDef } from "@tanstack/react-table";
import JobsOptions from "./job-options";

type AdminJobsProps = Pick<
  JobType,
  "company" | "_id" | "salary" | "position" | "createdAt" | "title" | "applications" | "description"
>;

export const JobsColumn: ColumnDef<AdminJobsProps>[] = [
  {
    header: "Company Name",
    cell: ({ row }) => {
      return row.original.company?.name || "No Company Name";
    },
  },
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "description",
    header: "Job Description",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const jobId = row.original._id;
      return <JobsOptions id={jobId} />;
    },
  },
  {
    header: "Application Count",
    cell: ({ row }) => {
      return row.original?.applications?.length || 0;
    },
  },
];
