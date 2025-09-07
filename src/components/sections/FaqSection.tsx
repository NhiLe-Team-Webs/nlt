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
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Câu hỏi thường gặp (FAQ)
          </h2>
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
              <span>1. Việc tham gia NhiLe Team có mất phí không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 0 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 0 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Hoàn toàn không. NhiLe Team hoạt động dựa trên tinh thần cống hiến và chia sẻ.
                  Mọi chương trình đào tạo và hoạt động đều miễn phí. Chúng tôi tìm kiếm những thành
                  viên có cam kết về thời gian và tâm huyết, thay vì yêu cầu về tài chính.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 2 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(1)}
            >
              <span>2. Tôi cần có kinh nghiệm về công nghệ trước khi tham gia không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 1 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 1 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Không bắt buộc. Chúng tôi chào đón tất cả các bạn trẻ có tinh thần ham học hỏi và
                  mong muốn phát triển. Nhiều nhóm học tập được thiết kế cho người mới bắt đầu. Điều
                  quan trọng nhất là thái độ cầu tiến và sự cam kết của bạn.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 3 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(2)}
            >
              <span>3. Thời gian cam kết tối thiểu mỗi tuần là bao nhiêu?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 2 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 2 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Chúng tôi mong muốn các thành viên có thể cam kết tối thiểu từ 10-15 giờ mỗi tuần
                  để đảm bảo bạn có thể theo kịp chương trình học, tham gia các buổi họp và đóng góp
                  vào dự án chung. Sự cam kết này là yếu tố then chốt để bạn có thể phát triển tối
                  đa tại team.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 4 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(3)}
            >
              <span>4. Tôi có cơ hội việc làm sau khi hoàn thành đào tạo không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 3 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 3 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Có. Những thành viên xuất sắc sau quá trình đào tạo và thực tập sẽ có cơ hội trở
                  thành nhân viên chính thức tại các công ty thuộc hệ sinh thái NhiLe Holding. Đây
                  là mục tiêu dài hạn của chúng tôi: đào tạo và xây dựng đội ngũ kế thừa có đủ Tâm -
                  Tầm - Đức.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 5 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(4)}
            >
              <span>5. Có cần phỏng vấn hay xét duyệt trước khi vào không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 4 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 4 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Có, bạn được tham gia một buổi phỏng vấn ngắn để HR hiểu rõ điểm mạnh, sở thích và
                  sắp xếp vị trí phù hợp cho bạn khi vào team.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 6 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(5)}
            >
              <span>6. Các công việc tình nguyện trong team gồm những gì?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 5 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 5 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Bạn có thể lựa chọn công việc theo khả năng và sở thích như: Admin, IT, Design,
                  HR, Editor, và nhiều vị trí khác.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 7 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(6)}
            >
              <span>7. Thời gian cam kết tối thiểu mỗi ngày là bao nhiêu?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 6 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 6 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>Bạn cần dành ít nhất 3 tiếng/ngày để tham gia và cống hiến cho team.</p>
              </div>
            </div>
          </div>

          {/* FAQ Item 8 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(7)}
            >
              <span>8. Nếu có việc bận, mình có thể xin nghỉ không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 7 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 7 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  Bạn có thể xin nghỉ khi có lý do chính đáng, nhưng tổng số ngày nghỉ tối đa là 12
                  ngày/năm. Chỉ cần báo trước 1-2 ngày trước khi off để team có thể sắp xếp công
                  việc hợp lý.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Item 9 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(8)}
            >
              <span>9. Khi tham gia NhiLe Team, mình học được gì?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 8 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 8 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600 space-y-2">
                <p>Cơ hội học nghề chuyên môn miễn phí.</p>
                <p>Phát triển kỹ năng sống & kỹ năng làm việc.</p>
                <p>Khám phá điểm mạnh bản thân và định hướng tương lai tự tin hơn.</p>
              </div>
            </div>
          </div>

          {/* FAQ Item 10 */}
          <div className="border-b border-slate-200 pb-4">
            <button
              className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              onClick={() => toggleFaq(9)}
            >
              <span>10. Có cơ hội kết nối bạn bè, làm việc nhóm không?</span>
              <svg
                className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === 9 ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`faq-answer ${openFaq === 9 ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-4 text-slate-600">
                <p>
                  NhiLe Team là một cộng đồng nơi bạn có cơ hội kết nối với nhiều người, mở rộng mối
                  quan hệ và làm việc nhóm. Tại đây, các bạn có thể cùng nhau trao đổi ý tưởng trong
                  công việc, chia sẻ cùng nhau và xây dựng những tình bạn mới.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
