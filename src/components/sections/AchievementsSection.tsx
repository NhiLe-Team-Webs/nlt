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
            <h3 className="text-xl font-semibold text-slate-900">Những hoạt động cộng đồng</h3>
            <p className="text-slate-500 mt-1">NhiLe Team</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Đây là phần ghi lại các sự kiện cộng đồng mà NhiLe Team đã tổ chức. Nó bao gồm các hoạt động kết nối, chia sẻ kiến thức, và tạo sân chơi cho các thành viên, giúp xây dựng một cộng đồng vững mạnh và gắn kết.
            </p>
            <Link to="/project-community-detail" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">
              Xem chi tiết dự án &rarr;
            </Link>
          </div>

          {/* Project Item 2 */}
          <div className="border-b border-slate-200 pb-10">
            <h3 className="text-xl font-semibold text-slate-900">Tham quan các di tích, địa điểm lịch sử</h3>
            <p className="text-slate-500 mt-1">NhiLe Team & NhiLe Foundation</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Đây là phần dành cho các dự án thiện nguyện hoặc hoạt động xã hội của team, tập trung vào việc bảo tồn hoặc quảng bá các di tích và địa điểm lịch sử. Nó thể hiện sự quan tâm của NhiLe Team đến giá trị văn hóa và lịch sử của đất nước.
            </p>
            <a href="#" data-target="home" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Tìm hiểu cơ hội &rarr;</a>
          </div>

          {/* Project Item 3 */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Các buổi gặp mặt trực tuyến</h3>
            <p className="text-slate-500 mt-1">NhiLe Team</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Đây là nơi lưu trữ các tài liệu, biên bản và ghi chép của các cuộc họp trực tuyến. Phần này phản ánh cách NhiLe Team vận hành một cách chuyên nghiệp, minh bạch và có tổ chức, đảm bảo mọi thành viên đều nắm bắt được thông tin và tiến độ công việc.
            </p>
            <a href="https://nlf.sg/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Xem dự án &rarr;</a>
          </div>

          {/* Project Item 4*/}
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Các buổi Team Building</h3>
            <p className="text-slate-500 mt-1">NhiLe Team</p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Đây là phần tổng hợp các hoạt động xây dựng đội ngũ. Nó cho thấy NhiLe Team không chỉ tập trung vào công việc mà còn chú trọng tạo ra một môi trường làm việc tích cực, nơi các thành viên có thể giao lưu, tăng cường sự hiểu biết và tin tưởng lẫn nhau.
            </p>
            <a href="https://nlf.sg/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-700">Xem dự án &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
};