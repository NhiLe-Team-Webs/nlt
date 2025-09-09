import { useEffect, useRef, useState } from 'react';

export const CommunityLeadersSection = () => {
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

  const leaders = [
    {
      name: 'Nhi Le',
      role: 'Người Sáng Lập',
      description: 'Với tầm nhìn và đam mê, Nhi Le đã đặt những viên gạch đầu tiên, xây dựng NhiLe Team từ con số 0 trở thành một cộng đồng lớn mạnh.',
      image: 'src/asset/nhile-avt.jpg',
      linkedin: 'https://www.linkedin.com/in/nhisg/',
    },
    {
      name: 'Phạm Đình Huê',
      role: 'Leader Quản lý & Đánh giá chất lượng',
      description: 'Chịu trách nhiệm quản lý, đánh giá chất lượng nghệ thuật – sáng tạo trong toàn bộ dự án và sản phẩm của NhiLe Team.',
      image: 'src/asset/hue-avt.jpg',
      linkedin: 'https://www.linkedin.com/in/hue-pham-9646aa220/',
    },
    {
      name: 'Lê Hoàng Khắc Sơn',
      role: 'Leader Công nghệ & AI',
      description: 'Chịu trách nhiệm xây dựng hệ thống công nghệ, phát triển ứng dụng và triển khai các giải pháp trí tuệ nhân tạo hỗ trợ vận hành cho NhiLe Team.',
      image: 'src/asset/sonle-avt.jpeg',
      linkedin: 'https://www.linkedin.com/in/le-hoang-khac-son-7335861b2/',
    },
    {
      name: 'Ngô Đức Danh',
      role: 'Leader Vận hành & Media',
      description: 'Chịu trách nhiệm vận hành, phát triển hệ thống làm việc, đồng thời điều phối và phát triển tổ Media trong NhiLe Team.',
      image: 'src/asset/danh-avt.jpeg',
      linkedin: 'https://www.linkedin.com/in/đức-danh-ngô-528645224/',
    },
    {
      name: 'Phạm Thị Thanh Thùy',
      role: 'Leader Vận hành Tổng & Sự kiện',
      description: 'Chịu trách nhiệm vận hành tổng thể, tổ chức các sự kiện lớn và nhỏ, đảm bảo mọi hoạt động diễn ra suôn sẻ và hiệu quả.',
      image: 'src/asset/thuy-avt.jpeg',
      linkedin: 'https://www.linkedin.com/in/tynanlt/',
    },
    {
      name: 'La Ngọc Hân',
      role: 'Leader Social Media',
      description: 'Chịu trách nhiệm xây dựng chiến lược, quản lý nội dung và phát triển các kênh mạng xã hội, fanpage của NhiLe Team.',
      image: 'src/asset/han-avt.jpeg',
      linkedin: 'https://www.linkedin.com/in/la-ngoc-han-436b71235/',
    },
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {leaders.map((leader, index) => (
            <div 
              key={index} 
              className={`group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" 
                src={leader.image} 
                alt={`Chân dung ${leader.name}`} 
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                <p className="text-slate-500 font-medium">{leader.role}</p>
                <p className="text-slate-600 text-sm mt-2 h-24">{leader.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a 
                    href={leader.linkedin} 
                    className="text-[#0A66C2] hover:text-blue-800 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-900">Bạn có tố chất của một nhà lãnh đạo?</h3>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Hãy tham gia cùng chúng tôi để phát triển tiềm năng của bạn và cùng nhau tạo ra sự thay đổi.
          </p>
          <a 
            href="#register-form" 
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
          >
            Trở thành thành viên
          </a>
        </div>
      </div>
    </section>
  );
};