import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

// Định nghĩa interface cho cấu trúc dữ liệu của một dự án
interface Project {
  projectTitle: string;
  projectDescription: string;
  slug: string;
  album: { src: string; alt: string; }[];
  stats?: { number: string; label: string; }[];
  layout?: string; // Thêm thuộc tính layout để điều khiển bố cục album
}

// Định nghĩa props cho component
interface ProjectCommunityDetailSectionProps {
  project: Project;
}

// Cập nhật component để nhận prop 'project'
export const ProjectCommunityDetailSection = ({ project }: ProjectCommunityDetailSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAlbumLayoutClass = (index: number) => {
    switch (project.layout) {
      case '5-5-grid':
        if (index < 5) return 'col-span-1 row-span-1';
        if (index >= 5 && index < 10) return 'col-span-1 row-span-1';
        return '';
      case 'large-first':
        return index === 0 ? 'col-span-2 row-span-2' : '';
      default:
        return '';
    }
  };

  return (
    <section 
      id="project-community-detail-page" 
      ref={sectionRef} 
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-8">
          <Link
            to="/achievements"
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            &larr; Quay lại Thành tựu
          </Link>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {project.projectTitle}
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl">
            {project.projectDescription}
          </p>
          
          {/* Stats section */}
          {project.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {project.stats.map((stat, s_idx) => (
                <div key={s_idx} className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                  <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Album */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Album hình ảnh cộng đồng</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.album.map((img, j) => (
                <div 
                  key={j} 
                  className={`rounded-2xl overflow-hidden ${getAlbumLayoutClass(j)}`}
                >
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
      </div>
    </section>
  );
};