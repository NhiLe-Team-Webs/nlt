// src/components/sections/ProjectCommunityDetailSection.tsx
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

// Import all necessary images
import ninetyNineDays1 from '../../asset/99days/1.jpg';
import ninetyNineDays2 from '../../asset/99days/2.jpg';
import datingWithNLT1 from '../../asset/Dating with NLT/1.jpeg';
import datingWithNLT2 from '../../asset/Dating with NLT/2.jpeg';
import datingWithNLT3 from '../../asset/Dating with NLT/3.jpeg';
import datingWithNLT4 from '../../asset/Dating with NLT/4.jpeg';
import datingWithNLT5 from '../../asset/Dating with NLT/5.jpeg';
import datingWithNLT6 from '../../asset/Dating with NLT/6.jpeg';
export const ProjectCommunityDetailSection = () => {
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

  const projects = [
    {
      title: "Dự án: 99 days",
      description:
        "Tập thể dục và phát triển bản thân cùng cộng đồng NhiLe Team. Dự án khuyến khích các thành viên duy trì thói quen tích cực trong 99 ngày liên tiếp, từ đó hình thành lối sống lành mạnh và bền vững.",
      album: [
        // 5 ảnh lớn
        { src: ninetyNineDays1, alt: "Ngày 1 của thử thách" },
        { src: ninetyNineDays2, alt: "Hoàn thành thử thách" },
       ],
    },
    {
      title: "Dự án: Dating with NhiLe Team",
      description:
        "Chuỗi sự kiện kết nối các thành viên trong cộng đồng NhiLe Team. Dự án giúp mọi người hiểu nhau hơn, xây dựng tình bạn và tinh thần làm việc nhóm thông qua các hoạt động tương tác thú vị và ý nghĩa.",
      stats: [
        { number: "2000+", label: "Người tham dự" },
        { number: "100+", label: "Khóa học trực tuyến" },
        { number: "80+", label: "Giảng viên & chuyên gia" },
        { number: "15+", label: "Quốc gia tham gia" },
      ],
      album: [
        { src: datingWithNLT1, alt: "Dating with NLT" },
        { src: datingWithNLT2, alt: "Dating with NLT" },
        { src: datingWithNLT3, alt: "Dating with NLT" },
        { src: datingWithNLT4, alt: "Dating with NLT" },
        { src: datingWithNLT5, alt: "Dating with NLT" },
        { src: datingWithNLT6, alt: "Dating with NLT" },
      ],
    }
  ];

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

        {projects.map((project, idx) => (
          <div key={idx} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {project.title}
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl">
              {project.description}
            </p>
            {/* Album */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Album hình ảnh cộng đồng</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.album.map((img, j) => (
                  <div 
                    key={j} 
                    className={`rounded-2xl overflow-hidden ${
                      // Tạo hiệu ứng 5 ảnh lớn, 5 ảnh nhỏ
                      (project.title === "Dự án: 99 days") && j < 5 ? "col-span-1 row-span-1" :
                      (project.title === "Dự án: 99 days" && j >= 5 && j < 10 ? "col-span-1 row-span-1" : 
                      (j === 0 ? "col-span-2 row-span-2" : ""))}
                    `}
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