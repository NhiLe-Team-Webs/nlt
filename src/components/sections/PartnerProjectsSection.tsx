import { useState, useRef, useEffect } from 'react';
import { usePartnerProjects } from '../../hooks/usePartnerProjects';

// Import all necessary images
import nsaImage from '../../asset/nsa.jpg';
import nsa2Image from '../../asset/nsa2.jpg';
import teamrise1Image from '../../asset/teamrise1.jpg';
import teamrise2Image from '../../asset/teamrise2.jpg';
import teamrise3Image from '../../asset/teamrise3.jpg';
import thisIsHome1 from '../../asset/This is Home/this_is_home_1.png';
import thisIsHome2 from '../../asset/This is Home/this_is_home_2.png';
import thisIsHome3 from '../../asset/This is Home/this_is_home_3.png';

export const PartnerProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const sectionRef = useRef<HTMLElement>(null);

  const { projects, loading, error } = usePartnerProjects();

  // Fallbacks
  const defaultBg = 'bg-slate-700';
  const defaultImage = nsaImage; // Hoặc chọn ảnh mặc định phù hợp

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
            // Fallbacks
            const bgColor = project.background_color || defaultBg;
            const imageUrl = project.image_url || defaultImage;
            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded-2xl ${bgColor}`}
              >
                <div className="relative w-full h-full cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                    <p className="text-slate-300 mt-1">{project.description}</p>
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