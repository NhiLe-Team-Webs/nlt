import { BlogSection } from "@/components/sections/BlogSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
      
      <main className="flex-grow">
        <BlogSection />
      </main>
      
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default BlogPage;