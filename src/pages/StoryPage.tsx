// src/pages/StoryPage.tsx
import { StorySection } from "@/components/sections/StorySection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const StoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        // Xử lý navigation nếu cần
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <StorySection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default StoryPage;