// src/components/sections/PartnerProjectsSection.tsx
import { useState, useRef, useEffect } from "react";
import { usePartnerProjects } from "@/hooks/use-partner-projects";

// Fallbacks
const FALLBACK_IMAGE = "/images/placeholder-project.svg"; // nhớ có file này trong public/images
const FALLBACK_BG = "#F5F5F7";

// Kiểu state cho index ảnh hiện tại của từng project (theo vị trí trong mảng)
type IndexMap = Record<number, number>;

export const PartnerProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<IndexMap>({});
  const sectionRef = useRef<HTMLElement>(null);

  // hook lấy dữ liệu từ API (đã lọc is_published=true & sort display_order trong service)
  const { data, isLoading, isError, error, refetch } = usePartnerProjects();

  // OBSERVER: hiệu ứng xuất hiện
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Chuẩn hoá data từ API -> cấu trúc giống projects cũ
  const projects = (data ?? []).map((p) => ({
    title: p.name,
    description: p.description ?? "",
    images: [p.image_url || FALLBACK_IMAGE],
    span: "md:col-span-2" as const,
    bg: p.background_color || FALLBACK_BG,
  }));

  // ====== Swipe logic (giữ nguyên tinh thần code cũ) ======
  const handleSwipe = (projectIndex: number, direction: "next" | "prev") => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev[projectIndex] || 0;
      const imagesLength = projects[projectIndex].images.length;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % imagesLength
          : currentIndex === 0
          ? imagesLength - 1
          : currentIndex - 1;
      return { ...prev, [projectIndex]: newIndex };
    });
  };

  const touchStartXRef = useRef<Record<number, number>>({});

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    projectIndex: number
  ) => {
    touchStartXRef.current[projectIndex] = e.touches[0].clientX;
  };

  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>,
    projectIndex: number
  ) => {
    const startX = touchStartXRef.current[projectIndex] ?? e.changedTouches[0].clientX;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) handleSwipe(projectIndex, diff > 0 ? "next" : "prev");
  };

  // ====== UI states ======
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-8">
            Dự án đã hoàn thành
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border p-6 animate-pulse">
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="h-56 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-8">
            Dự án đã hoàn thành
          </h2>
          <div className="rounded-xl border p-6 bg-red-50 text-center">
            <p className="text-red-700 font-medium">
              Không tải được danh sách dự án.
            </p>
            <p className="text-sm text-red-500 mt-1">{error}</p>
            <button
              onClick={refetch}
              className="mt-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Dự án đã hoàn thành
          </h2>
          <p className="text-slate-600">Chưa có dự án nào được publish.</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Làm mới
          </button>
        </div>
      </section>
    );
  }

  // ====== RENDER ======
  return (
    <section
      id="partner-projects-page"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Dự án đã hoàn thành
          </h2>
          <p className="text-lg text-slate-600 mt-4">
            Những câu chuyện thành công được viết nên từ sự hợp tác và tin tưởng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const currentIndex = currentImageIndex[index] || 0;
            const img = project.images[currentIndex] || FALLBACK_IMAGE;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl ${project.span}`}
                style={{ backgroundColor: project.bg }}
              >
                <div
                  className="relative w-full h-full cursor-pointer"
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchEnd={(e) => handleTouchEnd(e, index)}
                  onClick={() =>
                    project.images.length > 1 && handleSwipe(index, "next")
                  }
                >
                  <img
                    src={img}
                    alt={`${project.title} - ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, "prev");
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, "next");
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-slate-300 mt-1">{project.description}</p>
                    )}
                    {project.images.length > 1 && (
                      <div className="flex mt-3 space-x-2">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [index]: imgIndex,
                              }));
                            }}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 pointer-events-auto ${
                              imgIndex === currentIndex
                                ? "bg-white"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={refetch}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Làm mới
          </button>
        </div>
      </div>
    </section>
  );
};
