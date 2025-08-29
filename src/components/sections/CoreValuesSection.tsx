import { useEffect, useRef, useState } from 'react';

export const CoreValuesSection = () => {
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

  const values = [
    {
      title: 'Tâm',
      description: 'Mỗi hành động đều xuất phát từ sự chân thành và tình yêu thương. Lòng nhân ái là nền tảng để xây dựng một cộng đồng đoàn kết và bền vững.'
    },
    {
      title: 'Tầm',
      description: 'Chúng tôi nhìn xa hơn, không chỉ là thành công cá nhân mà là sự phát triển của cả cộng đồng, nơi mỗi cá nhân đều có cơ hội phát huy tối đa tiềm năng.'
    },
    {
      title: 'Đức',
      description: 'Sự chính trực là nền tảng của mọi quyết định. Chúng tôi tin thế giới cần những nhà lãnh đạo và những con người tử tế, đặt lợi ích cộng đồng lên trên hết.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          Giá trị cốt lõi
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-12">
          Nền Tảng Vững Chắc Của Chúng Tôi
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className={`bg-slate-50/50 p-8 rounded-2xl shadow-lg text-left border border-slate-200/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-4">
                {value.title}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};