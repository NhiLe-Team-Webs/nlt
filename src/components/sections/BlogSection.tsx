import { useState } from 'react';

export const BlogSection = () => {
  return (
    <section id="blog-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Tin tức & Câu chuyện</h2>
          <p className="text-lg text-slate-600 mt-4">
            Cập nhật những hoạt động mới nhất, những câu chuyện thành công và chia sẻ từ cộng đồng NhiLe Team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <a href="#" className="group block bg-white rounded-2xl shadow-lg overflow-hidden card-hover-effect border border-slate-200/80">
            <img src="https://placehold.co/600x400/1e293b/ffffff?text=Thiện+nguyện" alt="Charity Event" className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Cộng đồng &bull; 28/08/2025</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">Hành trình thiện nguyện "Ánh Sáng Tri Thức" tại Hà Giang</h3>
              <p className="text-slate-600 text-sm mb-4">Nhìn lại những khoảnh khắc đáng nhớ và ý nghĩa trong chuyến đi trao tặng sách và học bổng cho các em nhỏ vùng cao.</p>
              <span className="font-semibold text-blue-600">Đọc thêm &rarr;</span>
            </div>
          </a>
          {/* Blog Post 2 */}
          <a href="#" className="group block bg-white rounded-2xl shadow-lg overflow-hidden card-hover-effect border border-slate-200/80">
            <img src="https://placehold.co/600x400/475569/ffffff?text=Thành+viên" alt="Member Story" className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Câu chuyện thành viên &bull; 15/08/2025</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">Từ Zero đến Hero: Hành trình của một bạn trẻ tại Nhóm Học AI</h3>
              <p className="text-slate-600 text-sm mb-4">Lắng nghe chia sẻ của Minh Anh về quá trình học tập và nhận được cơ hội làm việc tại NhiLe Holding sau 6 tháng tham gia team.</p>
              <span className="font-semibold text-blue-600">Đọc thêm &rarr;</span>
            </div>
          </a>
          {/* Blog Post 3 */}
          <a href="#" className="group block bg-white rounded-2xl shadow-lg overflow-hidden card-hover-effect border border-slate-200/80">
            <img src="https://placehold.co/600x400/94a3b8/ffffff?text=Kỹ+năng" alt="Skill Workshop" className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-500 mb-1">Chia sẻ kiến thức &bull; 05/08/2025</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">5 Tư duy Lãnh đạo bạn học được tại NhiLe Team</h3>
              <p className="text-slate-600 text-sm mb-4">Đúc kết những bài học quý giá về tư duy lãnh đạo, giải quyết vấn đề và làm việc đội nhóm từ chính môi trường thực chiến của team.</p>
              <span className="font-semibold text-blue-600">Đọc thêm &rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};