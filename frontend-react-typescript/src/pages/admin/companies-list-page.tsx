import { DataTable } from "@/components/common/data-table";
import { CompaniesColumn } from "@/components/web/admin/admin-companies/companies-column";
import useAdminCompanies from "@/hooks/apis/use-admin-companies";
import Head from "@/utils/seo/head";

export default function CompanyListPage() {
  const { adminCompaniesData } = useAdminCompanies();
  return (
    <section>
      <Head title="Companies" description="job portal application, Companies list page" />
      <DataTable columns={CompaniesColumn} data={adminCompaniesData ?? []} filterName="name" />
    </section>
  );
}
