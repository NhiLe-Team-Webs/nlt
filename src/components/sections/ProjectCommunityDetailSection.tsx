// src/components/sections/ProjectCommunityDetailSection.tsx
import { Link } from "react-router-dom";

export const ProjectCommunityDetailSection = () => {
  const projects = [
    {
      title: "Dự án: Xây dựng Cộng đồng Học tập",
      description:
        "Một hành trình đáng nhớ trong việc tạo ra không gian kết nối, chia sẻ và phát triển cho hơn 5000 người Việt trẻ trên toàn cầu.",
      stats: [
        { number: "5000+", label: "Thành viên" },
        { number: "300+", label: "Thành viên cốt cán" },
        { number: "50+", label: "Workshops đã tổ chức" },
        { number: "10+", label: "Nhóm học tập chuyên sâu" },
      ],
      album: [
        { src: "https://placehold.co/800x800/1e293b/ffffff?text=Community+Event", alt: "Community event" },
        { src: "https://placehold.co/400x400/475569/ffffff?text=Workshop", alt: "Workshop" },
        { src: "https://placehold.co/400x400/94a3b8/ffffff?text=Team+Building", alt: "Team building" },
        { src: "https://placehold.co/400x400/64748b/ffffff?text=Group+Discussion", alt: "Group discussion" },
        { src: "https://placehold.co/400x400/334155/ffffff?text=Online+Meeting", alt: "Online meeting" },
      ],
    },
    {
      title: "Dự án: Kết nối Tri thức",
      description:
        "Lan tỏa giá trị tri thức tới cộng đồng thông qua workshop, sự kiện online và offline.",
      stats: [
        { number: "2000+", label: "Người tham dự" },
        { number: "100+", label: "Khóa học trực tuyến" },
        { number: "80+", label: "Giảng viên & chuyên gia" },
        { number: "15+", label: "Quốc gia tham gia" },
      ],
      album: [
        { src: "https://placehold.co/800x800/3b82f6/ffffff?text=Knowledge+Hub", alt: "Knowledge Hub" },
        { src: "https://placehold.co/400x400/0ea5e9/ffffff?text=Workshop+Online", alt: "Workshop Online" },
        { src: "https://placehold.co/400x400/38bdf8/ffffff?text=Mentor+Session", alt: "Mentor session" },
        { src: "https://placehold.co/400x400/0284c7/ffffff?text=Panel+Talk", alt: "Panel talk" },
        { src: "https://placehold.co/400x400/0369a1/ffffff?text=Networking", alt: "Networking" },
      ],
    },
    {
      title: "Dự án: Hành trình Lãnh đạo trẻ",
      description:
        "Chương trình huấn luyện kỹ năng lãnh đạo cho các bạn trẻ tiềm năng.",
      stats: [
        { number: "1000+", label: "Bạn trẻ tham gia" },
        { number: "60+", label: "Khóa đào tạo lãnh đạo" },
        { number: "25+", label: "Mentor đồng hành" },
        { number: "5+", label: "Trại hè lãnh đạo" },
      ],
      album: [
        { src: "https://placehold.co/800x800/16a34a/ffffff?text=Leadership+Camp", alt: "Leadership Camp" },
        { src: "https://placehold.co/400x400/22c55e/ffffff?text=Workshop+Leader", alt: "Workshop Leader" },
        { src: "https://placehold.co/400x400/4ade80/ffffff?text=Case+Study", alt: "Case study" },
        { src: "https://placehold.co/400x400/15803d/ffffff?text=Group+Challenge", alt: "Group Challenge" },
        { src: "https://placehold.co/400x400/166534/ffffff?text=Final+Pitch", alt: "Final Pitch" },
      ],
    },
    {
      title: "Dự án: Chia sẻ vì Cộng đồng",
      description:
        "Hoạt động thiện nguyện, gây quỹ và hỗ trợ người yếu thế nhằm lan tỏa tinh thần nhân ái.",
      stats: [
        { number: "700+", label: "Trẻ em được hỗ trợ" },
        { number: "$50,000+", label: "Quỹ quyên góp" },
        { number: "120+", label: "Tình nguyện viên" },
        { number: "30+", label: "Chuyến đi thiện nguyện" },
      ],
      album: [
        { src: "https://placehold.co/800x800/f97316/ffffff?text=Charity+Event", alt: "Charity event" },
        { src: "https://placehold.co/400x400/f59e0b/ffffff?text=Fundraising", alt: "Fundraising" },
        { src: "https://placehold.co/400x400/fbbf24/ffffff?text=Donation+Drive", alt: "Donation drive" },
        { src: "https://placehold.co/400x400/fcd34d/ffffff?text=Helping+Hand", alt: "Helping hand" },
        { src: "https://placehold.co/400x400/facc15/ffffff?text=Community+Care", alt: "Community care" },
      ],
    },
  ];

  return (
    <section id="project-community-detail-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-8">
          <Link
            to="/achievements"
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            &larr; Quay lại Thành tựu
          </Link>
        </div>

        {projects.map((project, idx) => (
          <div key={idx} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {project.title}
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl">
              {project.description}
            </p>

            {/* Thành tựu nổi bật */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Thành tựu nổi bật</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {project.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-100 p-6 rounded-2xl">
                    <p className="text-4xl font-bold apple-gradient-text">{stat.number}</p>
                    <p className="text-slate-600 mt-2 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Album */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Album hình ảnh cộng đồng</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.album.map((img, j) => (
                  <div key={j} className={`rounded-2xl overflow-hidden ${j === 0 ? "col-span-2 row-span-2" : ""}`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover gallery-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-16 text-center">
          <a
            href="#"
            data-target="community-synergy"
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
          >
            Khám phá các nhóm cộng đồng
          </a>
        </div>
      </div>
    </section>
  );
};
