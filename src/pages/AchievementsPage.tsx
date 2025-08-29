import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AchievementsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <AchievementsSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default AchievementsPage;