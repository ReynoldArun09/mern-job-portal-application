import SiteLogo from "@/components/common/site-logo";
import { useAuthStore } from "@/stores/useAuthStore";
import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import ProfileInfo from "./profile-info";

export default function SiteHeader() {
  const { user } = useAuthStore();
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
