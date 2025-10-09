import { useEffect, useRef, useState } from 'react';
import { useCommunityLeaders } from '../../hooks/useCommunityLeaders';
import { LeaderCard } from '../CommunityLeaders/LeaderCard';
import { LeadersSkeleton } from '../ui/LeaderCardSkeleton';


export const CommunityLeadersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { leaders, loading, error } = useCommunityLeaders();

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

  const scrollToRegistrationForm = () => {
    window.location.href = '/home#register-form';
  };

  return (
    <section 
      id="community-leaders-page" 
      ref={sectionRef} 
      className={`py-16 md:py-24 bg-slate-50 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Leaders Cộng Đồng Chúng Tôi</h2>
          <p className="text-lg text-slate-600 mt-4">
            Những người dẫn dắt, truyền cảm hứng và xây dựng nền tảng cho sự phát triển vững mạnh của NhiLe Team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <LeadersSkeleton count={6} />
          ) : error ? (
            <div className="col-span-full text-center text-red-600">
              <p>Có lỗi xảy ra khi tải dữ liệu: {error}</p>
            </div>
          ) : leaders.length === 0 ? (
            <div className="col-span-full text-center text-slate-600">
              <p>Chưa có thông tin về lãnh đạo cộng đồng.</p>
            </div>
          ) : (
            leaders.map((leader, index) => (
              <LeaderCard 
                key={leader.id} 
                leader={leader} 
                index={index} 
                isVisible={isVisible} 
              />
            ))
          )}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-900">Bạn có tố chất của một nhà lãnh đạo?</h3>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Hãy tham gia cùng chúng tôi để phát triển tiềm năng của bạn và cùng nhau tạo ra sự thay đổi.
          </p>
          <button 
            onClick={scrollToRegistrationForm}
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
          >
            Trở thành thành viên
          </button>
        </div>
      </div>
    </section>
  );
};