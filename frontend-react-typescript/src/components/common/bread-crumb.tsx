import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/browse")) return "Browse";
    if (pathname.includes("/jobs")) return "Jobs";
    if (pathname.includes("/description/")) return "Description";
    return null;
  };

  const pageHeading = getPageLabel(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{pageHeading}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
