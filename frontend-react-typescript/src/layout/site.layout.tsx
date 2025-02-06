import { Outlet } from "react-router-dom";
import SiteFooter from "../components/web/site/site-footer";
import SiteHeader from "../components/web/site/site-header";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
