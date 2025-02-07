import { ApplicantType } from "@/stores/types";
import { ColumnDef } from "@tanstack/react-table";
import ApplicantsOptions from "./applicants-options";

type ApplicationTypeProps = ApplicantType;

export const ApplicantsColumn: ColumnDef<ApplicationTypeProps>[] = [
  {
    accessorKey: "PhoneNumber",
    header: "Contact",
  },
  {
    accessorKey: "Date",
    header: "createdAt",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <ApplicantsOptions id={row.original._id} />;
    },
  },
];
