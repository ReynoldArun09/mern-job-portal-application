import SiteCarousel from "@/components/web/site/site-carousel";
import SiteHero from "@/components/web/site/site-hero";
import SiteLatestJob from "@/components/web/site/site-latest-jobs";
import Head from "@/utils/seo/head";

export default function HomePage() {
  return (
    <>
      <Head title="Home Page" description="job portal application, Home page" />
      <SiteHero />
      <SiteCarousel />
      <SiteLatestJob />
    </>
  );
}
