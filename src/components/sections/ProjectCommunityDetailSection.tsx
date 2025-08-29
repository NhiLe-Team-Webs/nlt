// src/components/sections/ProjectCommunityDetailSection.tsx
import { Link } from "react-router-dom";

export const ProjectCommunityDetailSection = () => {
  return (
    <section id="project-community-detail-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-8">
          <Link to="/achievements" className="text-slate-600 hover:text-slate-900 font-semibold">&larr; Quay lại Thành tựu</Link>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Dự án: Xây dựng Cộng đồng Học tập</h2>
        <p className="text-lg text-slate-600 mt-4 max-w-3xl">
          Một hành trình đáng nhớ trong việc tạo ra không gian kết nối, chia sẻ và phát triển cho hơn 5000 người Việt trẻ trên toàn cầu.
        </p>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Thành tựu nổi bật</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-100 p-6 rounded-2xl">
              <p className="text-4xl font-bold apple-gradient-text">5000+</p>
              <p className="text-slate-600 mt-2 font-medium">Thành viên</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-2xl">
              <p className="text-4xl font-bold apple-gradient-text">300+</p>
              <p className="text-slate-600 mt-2 font-medium">Thành viên cốt cán</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-2xl">
              <p className="text-4xl font-bold apple-gradient-text">50+</p>
              <p className="text-slate-600 mt-2 font-medium">Workshops đã tổ chức</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-2xl">
              <p className="text-4xl font-bold apple-gradient-text">10+</p>
              <p className="text-slate-600 mt-2 font-medium">Nhóm học tập chuyên sâu</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Album hình ảnh cộng đồng</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
              <img src="https://placehold.co/800x800/1e293b/ffffff?text=Community+Event" alt="Community event" className="w-full h-full object-cover gallery-image" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://placehold.co/400x400/475569/ffffff?text=Workshop" alt="Workshop" className="w-full h-full object-cover gallery-image" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://placehold.co/400x400/94a3b8/ffffff?text=Team+Building" alt="Team building" className="w-full h-full object-cover gallery-image" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://placehold.co/400x400/64748b/ffffff?text=Group+Discussion" alt="Group discussion" className="w-full h-full object-cover gallery-image" />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://placehold.co/400x400/334155/ffffff?text=Online+Meeting" alt="Online meeting" className="w-full h-full object-cover gallery-image" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="#" data-target="community-synergy" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block">
            Khám phá các nhóm cộng đồng
          </a>
        </div>
      </div>
    </section>
  );
};