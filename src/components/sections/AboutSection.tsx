import { useEffect, useRef, useState } from 'react';
import nhileAvt from '../../asset/nhile-avt.jpg';

export const AboutSection = () => {
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={nhileAvt} 
              alt="Người sáng lập Nhi Le" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Người Sáng Lập
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Hành Trình Của Đam Mê Và Tầm Nhìn
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Từ những ngày đầu tiên, Nhi Le đã quyết tâm chia sẻ kiến thức và kỹ năng tới với giới trẻ Việt Nam, 
              đặc biệt là những em nhỏ có hoàn cảnh khó khăn. Với tâm huyết không ngừng, Nhi Le đã kêu gọi những 
              người cùng chí hướng tham gia.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Từ 3 người tiên phong, cộng đồng đã mở rộng lên hơn 300 thành viên cốt cán và hơn 5000 thành viên 
              tích cực, trở thành tiền thân cho NhiLe Foundation ngày nay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};