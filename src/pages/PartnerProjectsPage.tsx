import { PartnerProjectsSection } from "@/components/sections/PartnerProjectsSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PartnerProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />

      <main className="flex-grow">
        <PartnerProjectsSection />
      </main>

      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default PartnerProjectsPage;

