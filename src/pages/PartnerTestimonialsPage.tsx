import { PartnerTestimonialsSection } from "@/components/sections/PartnerTestimonialsSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PartnerTestimonialsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <PartnerTestimonialsSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default PartnerTestimonialsPage;