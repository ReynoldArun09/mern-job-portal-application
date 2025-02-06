import { Outlet } from "react-router-dom";
import SiteHeader from "../components/web/auth/site/site-header";
import SiteFooter from "../components/web/auth/site/site-footer";

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
