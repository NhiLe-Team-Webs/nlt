// src/App.tsx


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";


// Components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StoryPage from "./pages/StoryPage";
import CommunityLeadersPage from "./pages/CommunityLeadersPage";
import CommunitySynergyPage from "./pages/CommunitySynergyPage";
import PartnerProjectsPage from "./pages/PartnerProjectsPage";
import PartnerTestimonialsPage from "./pages/PartnerTestimonialsPage";
import AchievementsPage from "./pages/AchievementsPage";
import BlogPage from "./pages/BlogPage";
import FaqPage from "./pages/FaqPage";
import PrivacyStatement from "./pages/PrivacyStatement";
import TermsOfUse from "./pages/TermsOfUse";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCommunityDetailSection } from "./components/sections/ProjectCommunityDetailSection";
import { achievementCategories } from "./data/achievements";


const queryClient = new QueryClient();


// Component mới để xử lý trang của từng hạng mục thành tựu
const AchievementCategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const category = achievementCategories.find(c => c.slug === categorySlug);


  const handleNavigate = (target: string, href?: string) => {
    if (href) {
      window.location.href = href;
    } else {
      navigate(target);
    }
  };


  if (!category) {
    return <NotFound />;
  }


  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        <section id="category-page" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight text-center">
              {category.categoryTitle}
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto text-center">
              {category.categoryDescription}
            </p>
            <div className="mt-12 space-y-8">
              {/* Vòng lặp qua tất cả các dự án trong hạng mục và hiển thị chúng */}
              {category.projects.map((project, index) => (
                <div key={index}>
                  <ProjectCommunityDetailSection project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};




const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/community-leaders" element={<CommunityLeadersPage />} />
          <Route path="/community-synergy" element={<CommunitySynergyPage />} />
          <Route path="/partner-projects" element={<PartnerProjectsPage />} />
          <Route path="/partner-testimonials" element={<PartnerTestimonialsPage />} />
         
          {/* Route cho trang tổng quan thành tựu */}
          <Route path="/achievements" element={<AchievementsPage />} />
         
          {/* Route động cho các trang thành tựu cụ thể */}
          <Route path="/achievements/:categorySlug" element={<AchievementCategoryPage />} />
         
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-statement" element={<PrivacyStatement />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;

