import useAuth from "@/hooks/useAuth";
import SiteLogo from "@/components/common/site-logo";
import AuthButtons from "./authbuttons";
import NavLinks from "./navlinks";
import ProfileInfo from "./profileinfo";

export default function SiteHeader() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <header className="border-b">
      <div className="flex justify-between py-5 container mx-auto px-8 md:px-6 lg:px-4">
        <SiteLogo />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLinks authRole={role} />
              <ProfileInfo />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  );
}
