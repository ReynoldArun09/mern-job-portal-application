import { Outlet } from "react-router-dom";
import SiteFooter from "../components/web/site/site-footer";
import SiteHeader from "../components/web/site/site-header";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-8 md:px-6 lg:px-4 py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
