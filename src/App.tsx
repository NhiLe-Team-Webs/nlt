// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StoryPage from "./pages/StoryPage";
import CommunityLeadersPage from "./pages/CommunityLeadersPage";
import CommunitySynergyPage from "./pages/CommunitySynergyPage";
import PartnerProjectsPage from "./pages/PartnerProjectsPage";
import PartnerTestimonialsPage from "./pages/PartnerTestimonialsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProjectCommunityDetailPage from "./pages/ProjectCommunityDetailPage";  
import BlogPage from "./pages/BlogPage";
import FaqPage from "./pages/FaqPage"; 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/community-leaders" element={<CommunityLeadersPage />} />
          <Route path="/community-synergy" element={<CommunitySynergyPage />} />
          <Route path="/partner-projects" element={<PartnerProjectsPage />} />
          <Route path="/partner-testimonials" element={<PartnerTestimonialsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/project-community-detail" element={<ProjectCommunityDetailPage />} /> // 👈 Thêm route
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;