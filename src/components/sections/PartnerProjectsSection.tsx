import { useState, useRef, useEffect } from 'react';

// Import all necessary images
import nsaImage from '../../asset/nsa.jpg';
import nsa2Image from '../../asset/nsa2.jpg';
import teamrise2Image from '../../asset/teamrise2.jpg';
import teamrise4Image from '../../asset/teamrise3.jpg';
import thisIsHome1 from '../../asset/This is Home/this_is_home_1.png';
import thisIsHome2 from '../../asset/This is Home/this_is_home_2.png';
import thisIsHome3 from '../../asset/This is Home/this_is_home_3.png';

export const PartnerProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: 'Dự Án This Is Home',
      description: 'This Is Home chuyên cung cấp giải pháp toàn diện, kết nối du khách với văn hoá bản địa và cá nhân hoá hành trình tại Việt Nam. Với cam kết mang đến trải nghiệm độc đáo và chân thực, mỗi chuyến đi cùng This Is Home không chỉ là hành trình tham quan, mà còn là cơ hội để bạn sống trọn vẹn cùng nhịp sống người Việt – từ văn hoá, ẩm thực đến những câu chuyện đời thường.',
      images: [thisIsHome1, thisIsHome2, thisIsHome3],
      span: 'md:col-span-2',
    },
    {
      title: 'Dự Án TeamRise',
      description: 'TeamRise đồng hành cùng các doanh nghiệp vừa và nhỏ thông qua giáo dục lãnh đạo chuyên sâu và phát triển tổ chức. Từ huấn luyện cơ bản đến các chiến lược phát triển bền vững, TeamRise tạo ra các liên minh chiến lược và xây dựng cộng đồng doanh nghiệp vững mạnh, thúc đẩy sự tăng trưởng và ảnh hưởng trong thị trường.',
      images: [teamrise2Image, teamrise4Image],
      span: 'md:col-span-2',
    },
    {
      title: 'Dự Án NSA',
      description: 'NSA Kids là quỹ hỗ trợ phi lợi nhuận do NhiLe Foundation và NSA hợp tác với NhiLe Team quản lý, với sứ mệnh triển khai trung tâm trị liệu miễn phí cho trẻ em kém may mắn. Dự án tập trung vào trị liệu và phục hồi vận động cho các em nhỏ mắc hội chứng SMA, cùng với các hoạt động cộng đồng nhằm nâng cao nhận thức và tạo môi trường hỗ trợ.',
      images: [nsaImage, nsa2Image],
      span: 'md:col-span-2',
    },
  ];

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

  const handleSwipe = (projectIndex, direction) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[projectIndex] || 0;
      const imagesLength = projects[projectIndex].images.length;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % imagesLength;
      } else {
        newIndex = currentIndex === 0 ? imagesLength - 1 : currentIndex - 1;
      }
      
      return { ...prev, [projectIndex]: newIndex };
    });
  };

  const handleTouchStart = (e, projectIndex) => {
    const touch = e.touches[0];
    e.target.dataset.touchStartX = touch.clientX;
  };

  const handleTouchEnd = (e, projectIndex) => {
    const touch = e.changedTouches[0];
    const touchStartX = parseFloat(e.target.dataset.touchStartX);
    const touchEndX = touch.clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        handleSwipe(projectIndex, 'next');
      } else {
        handleSwipe(projectIndex, 'prev');
      }
    }
  };

  return (
    <section 
      id="partner-projects-page" 
      ref={sectionRef} 
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Dự án đã hoàn thành</h2>
          <p className="text-lg text-slate-600 mt-4">
            Những câu chuyện thành công được viết nên từ sự hợp tác và tin tưởng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const currentIndex = currentImageIndex[index] || 0;
            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl ${project.span}`}
              >
                <div 
                  className="relative w-full h-full cursor-pointer"
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchEnd={(e) => handleTouchEnd(e, index)}
                  onClick={() => project.images.length > 1 && handleSwipe(index, 'next')}
                >
                  <img 
                    src={project.images[currentIndex]} 
                    alt={`${project.title} - ${currentIndex + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  
                  {/* Navigation arrows for desktop */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, 'prev');
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwipe(index, 'next');
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-slate-300 mt-1">{project.description}</p>
                    {project.images.length > 1 && (
                      <div className="flex mt-3 space-x-2">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(prev => ({ ...prev, [index]: imgIndex }));
                            }}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 pointer-events-auto ${
                              imgIndex === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
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
      </div>
    </section>
  );
};