import { useState } from 'react';

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: '1. Tham gia NhiLe Team có mất phí không?',
      answer: 'Không, khi bạn vào làm tình nguyện viên tại NhiLe Team hoàn toàn không mất phí. Bạn được học nghề và tham gia các hoạt động của team hoàn toàn miễn phí. Tuy nhiên, bạn cần cam kết dành ít nhất 3 tiếng mỗi ngày để cống hiến cho team.',
    },
    {
      question: '2. Nếu chưa có kinh nghiệm gì thì có thể tham gia không?',
      answer: 'Có nha vì NhiLe Team không yêu cầu bạn phải có kinh nghiệm. Ở đây bạn được đào tạo từ những kỹ năng cơ bản nhất, phù hợp cho người mới bắt đầu. Điều quan trọng là bạn cần có tinh thần học hỏi và sẵn sàng phát triển bản thân mỗi ngày.',
    },
    {
      question: '3. NhiLe Team có giới hạn độ tuổi không (chỉ sinh viên hay học sinh mới tham gia được)?',
      answer: 'Không giới hạn độ tuổi. Tuy nhiên, để tham gia, bạn cần:\n- Có tinh thần trách nhiệm với công việc.\n- Chủ động học hỏi và sẵn sàng hỗ trợ đồng đội.\n- Luôn duy trì tư duy phát triển và nâng cấp bản thân.',
    },
    {
      question: '4. Khi tham gia team, mình cần chuẩn bị thiết bị gì?',
      answer: 'Bạn cần có máy tính/ laptop/ PC để thực hiện công việc. Ngoài ra, yêu cầu có ChatGPT Plus để tham gia đầy đủ các hoạt động trong team.',
    },
    {
      question: '5. Có cần phỏng vấn hay xét duyệt trước khi vào không?',
      answer: 'Có, bạn được tham gia một buổi phỏng vấn ngắn để HR hiểu rõ điểm mạnh, sở thích và sắp xếp vị trí phù hợp cho bạn khi vào team.',
    },
    {
      question: '6. Các công việc tình nguyện trong team gồm những gì?',
      answer: 'Bạn có thể lựa chọn công việc theo khả năng và sở thích như: Admin, IT, Design, HR, Editor, và nhiều vị trí khác.',
    },
    {
      question: '7. Thời gian cam kết tối thiểu mỗi ngày là bao nhiêu?',
      answer: 'Bạn cần dành ít nhất 3 tiếng/ngày để tham gia và cống hiến cho team.',
    },
    {
      question: '8. Nếu có việc bận, mình có thể xin nghỉ không?',
      answer: 'Bạn có thể xin nghỉ khi có lý do chính đáng, nhưng tổng số ngày nghỉ tối đa là 12 ngày/năm. Chỉ cần báo trước 1-2 ngày trước khi off để team có thể sắp xếp công việc hợp lý.',
    },
    {
      question: '9. Khi tham gia NhiLe Team, mình học được gì?',
      answer: 'Khi vào NhiLe Team, bạn nhận được:\n- Cơ hội học nghề chuyên môn miễn phí.\n- Phát triển kỹ năng sống & kỹ năng làm việc.\n- Khám phá điểm mạnh bản thân và định hướng tương lai tự tin hơn.',
    },
    {
      question: '10. Có cơ hội kết nối bạn bè, làm việc nhóm không?',
      answer: 'NhiLe Team là một cộng đồng nơi bạn có cơ hội kết nối với nhiều người, mở rộng mối quan hệ và làm việc nhóm. Tại đây, các bạn có thể cùng nhau trao đổi ý tưởng trong công việc, chia sẻ cùng nhau và xây dựng những tình bạn mới.',
    },
  ];

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
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 pb-4">
              <button
                className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform shrink-0 faq-arrow ${openFaq === index ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`faq-answer ${openFaq === index ? 'block' : 'hidden'}`}>
                <div className="pt-2 pb-4 text-slate-600">
                  {faq.answer.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};