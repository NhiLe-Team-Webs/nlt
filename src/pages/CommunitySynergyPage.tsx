// src/pages/CommunitySynergyPage.tsx
import { CommunitySynergySection } from "@/components/sections/CommunitySynergySection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CommunitySynergyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <CommunitySynergySection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default CommunitySynergyPage;