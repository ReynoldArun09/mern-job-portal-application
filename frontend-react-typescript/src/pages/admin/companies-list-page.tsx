import { DataTable } from "@/components/common/data-table";
import { CompaniesColumn } from "@/components/web/admin/admin-companies/companies-column";
import useAdminCompanies from "@/hooks/apis/use-admin-companies";

export default function CompanyListPage() {
  const { adminCompaniesData } = useAdminCompanies();
  return (
    <section>
      <DataTable columns={CompaniesColumn} data={adminCompaniesData ?? []} filterName="name" />
    </section>
  );
}
