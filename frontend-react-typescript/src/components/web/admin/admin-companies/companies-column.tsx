import { ColumnDef } from "@tanstack/react-table";
import CompaniesOptions from "./companies-options";

interface CompanyDataType {
  _id: string;
  name: string;
  website: string;
  location: string;
  createdAt: string;
}

export const CompaniesColumn: ColumnDef<CompanyDataType>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "date",
    enableHiding: false,
    header: "Created Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <CompaniesOptions id={row.original._id} />;
    },
  },
];
