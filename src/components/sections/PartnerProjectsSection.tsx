import { useState, useRef, useEffect } from "react";
import { usePartnerProjects } from "@/hooks/use-partner-projects";

// Fallbacks
const FALLBACK_IMAGE = "/images/placeholder-project.svg";
const FALLBACK_BG = "#F5F5F7";

// Kiểu state cho index ảnh hiện tại của từng project
type IndexMap = Record<number, number>;

export const PartnerProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<IndexMap>({});
  const sectionRef = useRef<HTMLElement>(null);

  // hook lấy dữ liệu từ API
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

  // Chuẩn hoá data từ API
  const projects = (data ?? []).map((p) => ({
    title: p.name,
    description: p.description ?? "",
    images: [p.image_url || FALLBACK_IMAGE],
    span: "md:col-span-2" as const,
    bg: p.background_color || FALLBACK_BG,
  }));

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLElement).setAttribute('data-touch-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent, index: number) => {
    const touch = e.changedTouches[0];
    const touchStartX = parseFloat((e.currentTarget as HTMLElement).getAttribute('data-touch-start-x') || '0');
    const diff = touchStartX - touch.clientX;

    if (Math.abs(diff) > 50) {
      handleSwipe(index, diff > 0 ? "next" : "prev");
    }
  };

  const handleSwipe = (index: number, direction: "prev" | "next") => {
    const project = projects[index];
    if (!project || project.images.length <= 1) return;

    setCurrentImageIndex((prev) => {
      const current = prev[index] || 0;
      let next = direction === "next" ? current + 1 : current - 1;
      
      if (next >= project.images.length) next = 0;
      if (next < 0) next = project.images.length - 1;
      
      return { ...prev, [index]: next };
    });
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Đang tải dự án...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Lỗi tải dữ liệu
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              type="button"
              onClick={refetch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Dự án đối tác
          </h2>
          <p className="text-lg text-slate-600 mt-4">
            Khám phá các dự án đặc biệt mà chúng tôi đã thực hiện cùng với các đối tác
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

                  {/* Navigation arrows for desktop */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, "prev");
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, "next");
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image indicators */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {project.images.map((_, imgIndex) => (
                        <button
                          type="button"
                          aria-label={`Go to image ${imgIndex + 1}`}
                          key={imgIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({ ...prev, [index]: imgIndex }));
                          }}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            imgIndex === currentIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Project info overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-slate-300 mt-1">{project.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refetch button for testing */}
        <div className="text-center mt-8">
          <button 
            type="button"
            onClick={refetch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Làm mới dữ liệu
          </button>
        </div>
      </div>
    </section>
  );
};
