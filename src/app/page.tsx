import { HeroSection } from "@/components/layout/hero-section";
import { FeaturesSection } from "@/components/layout/features-section";
import { StatsSection } from "@/components/layout/stats-section";
import { CTASection } from "@/components/layout/cta-section";
import { Header } from "@/components/layout/header";
// import { PricingSection } from "@/components/layout/pricing-section";

export default function Home() {

  // // creating admin using custom function
  // useEffect(() => {

  //   // calling the signup api for admin with custom credentials
  //   const response = await fetch("/api/auth/admin/signup", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: "Haseeb Ahmed Raza Khan",
  //       email: "web.dev.haseeb@gmail.com",
  //       password: "Haseeb,.12",
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to create admin");
  //   }

  //   const data = await response.json();
  //   console.log(data);
  // }, []);

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
