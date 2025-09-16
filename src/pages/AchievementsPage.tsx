// src/pages/AchievementsPage.tsx

import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const AchievementsPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (target: string, href?: string) => {
    if (href) {
      window.location.href = href;
    } else {
      navigate(target);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        <AchievementsSection />
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default AchievementsPage;