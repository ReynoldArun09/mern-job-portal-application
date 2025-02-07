import HeroContent from "./hero-content";
import HeroSearch from "./hero-search";

export default function SiteHero() {
  return (
    <section className="text-center space-y-5 py-10">
      <HeroContent />
      <HeroSearch />
    </section>
  );
}
