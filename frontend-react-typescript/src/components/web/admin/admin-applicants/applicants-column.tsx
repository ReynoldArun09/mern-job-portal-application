import { ApplicantType } from "@/stores/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../ui/button";

type ApplicationTypeProps = ApplicantType;

export const ApplicantsColumn: ColumnDef<ApplicationTypeProps>[] = [
  {
    header: "Job Title",
    cell: ({ row }) => {
      return row.original.job?.title || "No Job Title";
    },
  },
  {
    header: "Applicant Name",
    cell: ({ row }) => {
      return row.original.applicant.fullname || "No Applicant Name";
    },
  },
  {
    header: "Applicant Phone",
    cell: ({ row }) => {
      return row.original.applicant.phoneNumber || "No Number";
    },
  },
  {
    header: "Applicant Email",
    cell: ({ row }) => {
      return row.original.applicant.email || "No Email";
    },
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: () => {
      return <Button size={"sm"}>Download Resume</Button>;
    },
  },
];
