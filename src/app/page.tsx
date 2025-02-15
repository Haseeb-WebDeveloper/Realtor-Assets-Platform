import { HeroSection } from "@/components/layout/hero-section";
import { FeaturesSection } from "@/components/layout/features-section";
import { StatsSection } from "@/components/layout/stats-section";
import { CTASection } from "@/components/layout/cta-section";
import { Header } from "@/components/layout/header";
// import { PricingSection } from "@/components/layout/pricing-section";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      {/* <StatsSection />
      <FeaturesSection /> */}
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
    </main>
  );
}
