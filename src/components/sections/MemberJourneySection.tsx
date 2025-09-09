import { useEffect, useRef, useState } from 'react';

export const MemberJourneySection = () => {
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
      id="member-journey"
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Lộ trình của bạn
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-16">
            Hành trình trở thành thành viên cốt cán
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* The line for desktop */}
          <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-slate-200 hidden md:block" aria-hidden="true"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {/* Item 1 */}
            <div className="relative flex items-start md:items-center">
              <div className="md:w-1/2 md:pr-8 md:text-right">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-slate-200/80">
                  <h4 className="text-lg font-bold text-slate-900">Bước 1: Gửi đơn đăng ký</h4>
                  <p className="mt-2 text-slate-600">Hoàn thành biểu mẫu khảo sát chi tiết để chúng tôi hiểu rõ hơn về mục tiêu và mong muốn của bạn.</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold absolute left-6 md:left-1/2 -translate-x-1/2 z-10 -top-5 md:top-auto ring-8 ring-slate-50">1</div>
              <div className="w-0.5 h-full bg-slate-200 absolute left-11 md:hidden -z-10 top-0"></div>
              <div className="hidden md:block md:w-1/2 md:pl-8"></div>
            </div>
            {/* Item 2 */}
            <div className="relative flex items-start md:items-center">
              <div className="hidden md:block md:w-1/2 md:pr-8"></div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold absolute left-6 md:left-1/2 -translate-x-1/2 z-10 -top-5 md:top-auto ring-8 ring-slate-50">2</div>
              <div className="w-0.5 h-full bg-slate-200 absolute left-11 md:hidden -z-10 top-0"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-slate-200/80">
                  <h4 className="text-lg font-bold text-slate-900">Bước 2: Phỏng vấn & Sàng lọc</h4>
                  <p className="mt-2 text-slate-600">Một buổi trò chuyện để tìm hiểu sự phù hợp về văn hoá và cam kết lâu dài của bạn với team.</p>
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="relative flex items-start md:items-center">
              <div className="md:w-1/2 md:pr-8 md:text-right">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-slate-200/80">
                  <h4 className="text-lg font-bold text-slate-900">Bước 3: Đào tạo chuyên sâu</h4>
                  <p className="mt-2 text-slate-600">Tham gia các khóa học kỹ năng, workshop và làm việc nhóm để phát triển bản thân toàn diện.</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold absolute left-6 md:left-1/2 -translate-x-1/2 z-10 -top-5 md:top-auto ring-8 ring-slate-50">3</div>
              <div className="w-0.5 h-full bg-slate-200 absolute left-11 md:hidden -z-10 top-0"></div>
              <div className="hidden md:block md:w-1/2 md:pl-8"></div>
            </div>
            {/* Item 4 */}
            <div className="relative flex items-start md:items-center">
              <div className="hidden md:block md:w-1/2 md:pr-8"></div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold absolute left-6 md:left-1/2 -translate-x-1/2 z-10 -top-5 md:top-auto ring-8 ring-slate-50">4</div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-slate-200/80">
                  <h4 className="text-lg font-bold text-slate-900">Bước 4: Thực tập & Cống hiến</h4>
                  <p className="mt-2 text-slate-600">Áp dụng kiến thức vào các dự án thực tế tại NhiLe Holding và đóng góp giá trị cho cộng đồng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};