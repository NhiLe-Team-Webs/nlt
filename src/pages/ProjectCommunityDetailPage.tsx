// src/pages/ProjectCommunityDetailPage.tsx
import { ProjectCommunityDetailSection } from "@/components/sections/ProjectCommunityDetailSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ProjectCommunityDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <ProjectCommunityDetailSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default ProjectCommunityDetailPage;