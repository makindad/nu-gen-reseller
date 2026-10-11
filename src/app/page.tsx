import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WholesaleSection } from "@/components/WholesaleSection";
import { ProductGrid } from "@/components/ProductGrid";
import { PartnerBenefits } from "@/components/PartnerBenefits";
import { QualitySection } from "@/components/QualitySection";
import { DarkStatementSection } from "@/components/DarkStatementSection";
import { FAQ } from "@/components/FAQ";
import { ResellerForm } from "@/components/ResellerForm";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <WholesaleSection />
        <ProductGrid />
        <PartnerBenefits />
        <QualitySection />
        <DarkStatementSection />
        <FAQ />
        <ResellerForm />
      </main>
      <Footer />
    </>
  );
}
