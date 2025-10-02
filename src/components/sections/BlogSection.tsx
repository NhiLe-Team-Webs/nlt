import { format } from 'date-fns';
import { vi } from 'date-fns/locale';// src/components/sections/BlogSection.tsx
import { useState } from 'react';


export const BlogSection = () => {
  
  // Dữ liệu blog mẫu (có thể chuyển thành API sau)
  const blogs = [
    {
      id: 1,
      title: "Hành trình từ 0 đến AI: Làm sao để bắt đầu?",
      excerpt: "Một hướng dẫn chi tiết dành cho người mới, không cần kiến thức lập trình.",
      image: "https://placehold.co/600x400/e2e8f0/334155?text=AI+Beginner",
      category: "AI & Machine Learning",
      date: "28/08/2025",
      published_at: "2025-03-10T08:00:00Z"
    },
    {
      id: 2,
      title: "Làm tình nguyện viên tại NhiLe: Trải nghiệm đáng nhớ",
      excerpt: "Chia sẻ từ một thành viên sau 6 tháng tham gia các hoạt động cộng đồng.",
      image: "https://placehold.co/600x400/e2e8f0/334155?text=Tình+nguyện",
      category: "Cộng đồng",
      date: "15/09/2025",
      published_at: "2025-03-10T08:00:00Z"
    },
    {
      id: 3,
      title: "Xây dựng đội ngũ vận hành chuyên nghiệp",
      excerpt: "Bí quyết quản lý và phát triển nhóm vận hành hiệu quả trong tổ chức phi lợi nhuận.",
      image: "https://placehold.co/600x400/e2e8f0/334155?text=Vận+hành",
      category: "Vận hành",
      date: "01/10/2025",
      published_at: "2025-03-10T08:00:00Z"
    }
  ];
const [currentPage, setCurrentPage] = useState(1);
const limit = 3;
const totalPages = Math.ceil(blogs.length / limit);
const startIndex = (currentPage - 1) * limit;
const currentBlogs = blogs.slice(startIndex, startIndex + limit);


  return (
    <section id="blog-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          {/* ======== TIÊU ĐỀ ======== */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight text-center">
            Tin tức & Câu chuyện
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto">
            Cập nhật những hoạt động, chia sẻ và câu chuyện truyền cảm hứng từ cộng đồng NhiLe Team.
          </p>

          {/* ======== KHU VỰC BLOG ======== */}
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium">
                   {format(new Date(blog.published_at), 'dd MMM yyyy', { locale: vi })}
                  </p>
                  <h4 className="text-xl font-semibold text-slate-900 mt-2 line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-slate-600 mt-2 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Đọc thêm →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-8">
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        page === currentPage
          ? 'bg-blue-600 text-white'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {page}
    </button>
  ))}
</div>
    </section>
  );
};