import { FaqSection } from "@/components/sections/FaqSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const FaqPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <FaqSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default FaqPage;