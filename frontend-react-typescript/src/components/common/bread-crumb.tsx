import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

export default function BreadCrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const getPageLabel = (pathname: string) => {
    if (pathname.includes("/browse")) return "Browse";
    if (pathname.includes("/jobs")) return "Jobs";
    return null;
  };

  const pageHeading = getPageLabel(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{pageHeading}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
