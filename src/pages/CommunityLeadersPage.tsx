// src/pages/CommunityLeadersPage.tsx
import { CommunityLeadersSection } from "@/components/sections/CommunityLeadersSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeaderList } from '../components/CommunityLeaders/LeaderList'

const CommunityLeadersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <CommunityLeadersSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default CommunityLeadersPage;

