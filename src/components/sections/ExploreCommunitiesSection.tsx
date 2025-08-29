import { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ExploreCommunitiesSectionProps {
  onNavigate: (target: string) => void;
}

export const ExploreCommunitiesSection = ({ onNavigate }: ExploreCommunitiesSectionProps) => {
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

  const communities = [
    {
      title: 'Nhóm Học AI',
      description: 'Cùng nhau tìm hiểu, nghiên cứu và ứng dụng Trí tuệ nhân tạo vào các dự án thực tế, thay đổi tương lai.',
      logo: 'https://placehold.co/150x50/e2e8f0/334155?text=Nhóm+AI'
    },
    {
      title: 'Nhóm Vận hành',
      description: 'Xây dựng và tối ưu hóa quy trình, đảm bảo sự hoạt động trơn tru và hiệu quả của toàn bộ hệ sinh thái NhiLe Team.',
      logo: 'https://placehold.co/150x50/e2e8f0/334155?text=Nhóm+Vận+hành'
    },
    {
      title: 'Nhóm Tình nguyện',
      description: 'Lan tỏa giá trị nhân ái qua các dự án thiện nguyện, mang tri thức và sự giúp đỡ đến những hoàn cảnh khó khăn.',
      logo: 'https://placehold.co/150x50/e2e8f0/334155?text=Tình+nguyện'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-slate-900">Khám phá các cộng đồng</h2>
          <p className="mt-4 text-lg text-slate-600">
            Luôn có một nơi dành cho bạn. Dù bạn có kỹ năng về công nghệ hay không, hãy tìm hiểu thêm về các cộng đồng của chúng tôi bên dưới để tìm nơi phù hợp.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <button
              key={community.title}
              onClick={() => onNavigate('community-synergy')}
              className={`group block p-8 bg-slate-50/50 hover:bg-white rounded-2xl transition-all duration-300 border border-slate-200/50 hover:transform hover:-translate-y-2 hover:shadow-xl text-left ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={community.logo} 
                alt={`Logo ${community.title}`} 
                className="h-12 mb-6"
              />
              <h3 className="text-xl font-bold text-slate-900 flex items-center">
                {community.title}
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-2 text-slate-600">
                {community.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};