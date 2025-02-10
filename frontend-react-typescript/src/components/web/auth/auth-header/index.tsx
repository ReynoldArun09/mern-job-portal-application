import SiteLogo from "@/components/common/site-logo";

export default function AuthHeader() {
  return (
    <header className="border-b">
      <div className="flex justify-between py-5 container mx-auto px-8 md:px-6 lg:px-4">
        <SiteLogo />
      </div>
    </header>
  );
}
