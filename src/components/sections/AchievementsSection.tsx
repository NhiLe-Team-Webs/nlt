// src/components/sections/AchievementsSection.tsx
import { Link } from "react-router-dom";

export const AchievementsSection = () => {
  return (
    <section id="achievements-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">Thành tựu & Dự án Nổi bật</h2>
        <div className="space-y-10 mt-10">

          {/* Project Item 1 */}
          <div className="border-b border-slate-200 pb-10">
            <h3 className="text-xl font-semibold text-slate-900">Xây dựng Cộng đồng Học tập trên 5000 thành viên</h3>
            <p className="text-slate-500 mt-1">NhiLe Team Community</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Phát triển và quản lý cộng đồng học tập trực tuyến, tạo ra một môi trường tích cực nơi các thành viên có thể chia sẻ kiến thức, hỗ trợ lẫn nhau và cùng phát triển các kỹ năng về công nghệ, AI, và kỹ năng mềm.
            </p>
            <Link to="/project-community-detail" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">
              Xem chi tiết dự án &rarr;
            </Link>
          </div>

          {/* Project Item 2 */}
          <div className="border-b border-slate-200 pb-10">
            <h3 className="text-xl font-semibold text-slate-900">Chương trình Đào tạo và Cung ứng Nhân sự cho NhiLe Holding</h3>
            <p className="text-slate-500 mt-1">NhiLe Holding & NhiLe Foundation</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Thiết kế và triển khai thành công các khóa học nghề chuyên sâu (AI, Vận hành, Editing). Nhiều học viên sau khi tốt nghiệp đã trở thành nhân viên chính thức, đóng góp trực tiếp vào sự phát triển của các công ty trong hệ sinh thái NhiLe Holding.
            </p>
            <a href="#" data-target="home" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Tìm hiểu cơ hội &rarr;</a>
          </div>

          {/* Project Item 3 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Dự án thiện nguyện "Ánh Sáng Tri Thức"</h3>
            <p className="text-slate-500 mt-1">NhiLe Foundation</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Tổ chức thành công chuỗi hoạt động gây quỹ và các chuyến đi thiện nguyện, trao tặng sách vở và các suất học bổng công nghệ cho trẻ em có hoàn cảnh khó khăn tại các vùng sâu vùng xa, lan tỏa giá trị của tri thức và lòng nhân ái.
            </p>
            <a href="https://nlf.sg/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Xem dự án &rarr;</a>
          </div>

        </div>
      </div>
    </section>
  );
};