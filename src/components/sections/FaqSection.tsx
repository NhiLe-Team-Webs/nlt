import { useState } from 'react';

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Câu hỏi thường gặp (FAQ)</h2>
          <p className="text-lg text-slate-600 mt-4">
            Những thắc mắc phổ biến nhất về quá trình tham gia và hoạt động tại NhiLe Team.
          </p>
        </div>
        <div className="space-y-4" id="faq-accordion">
          {/* FAQ Item 1 */}
          <div className="border-b border-slate-200 pb-4">
            <button 
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(0)}
            >
              <span>Việc tham gia NhiLe Team có mất phí không?</span>
              <svg 
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 0 ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 0 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>Hoàn toàn không. NhiLe Team hoạt động dựa trên tinh thần cống hiến và chia sẻ. Mọi chương trình đào tạo và hoạt động đều miễn phí. Chúng tôi tìm kiếm những thành viên có cam kết về thời gian và tâm huyết, thay vì yêu cầu về tài chính.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Item 2 */}
          <div className="border-b border-slate-200 pb-4">
            <button 
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(1)}
            >
              <span>Tôi cần có kinh nghiệm về công nghệ trước khi tham gia không?</span>
              <svg 
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 1 ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 1 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>Không bắt buộc. Chúng tôi chào đón tất cả các bạn trẻ có tinh thần ham học hỏi và mong muốn phát triển. Nhiều nhóm học tập được thiết kế cho người mới bắt đầu. Điều quan trọng nhất là thái độ cầu tiến và sự cam kết của bạn.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Item 3 */}
          <div className="border-b border-slate-200 pb-4">
            <button 
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(2)}
            >
              <span>Thời gian cam kết tối thiểu mỗi tuần là bao nhiêu?</span>
              <svg 
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 2 ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 2 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>Chúng tôi mong muốn các thành viên có thể cam kết tối thiểu từ 10-15 giờ mỗi tuần để đảm bảo bạn có thể theo kịp chương trình học, tham gia các buổi họp và đóng góp vào dự án chung. Sự cam kết này là yếu tố then chốt để bạn có thể phát triển tối đa tại team.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Item 4 */}
          <div className="border-b border-slate-200 pb-4">
            <button 
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(3)}
            >
              <span>Tôi có cơ hội việc làm sau khi hoàn thành đào tạo không?</span>
              <svg 
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 3 ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="2" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 3 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>Có. Những thành viên xuất sắc sau quá trình đào tạo và thực tập sẽ có cơ hội trở thành nhân viên chính thức tại các công ty thuộc hệ sinh thái NhiLe Holding. Đây là mục tiêu dài hạn của chúng tôi: đào tạo và xây dựng đội ngũ kế thừa có đủ Tâm - Tầm - Đức.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};