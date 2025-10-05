// src/components/sections/FaqSection.tsx
import { useState } from "react";
import ReactMarkdown from "react-markdown";
// Từ FaqSection.tsx (components/sections) đi lên hooks là ../../hooks
import { useFaqs } from "../../hooks/useFaqs";

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const state = useFaqs();

  const toggleFaq = (index: number) =>
    setOpenFaq(openFaq === index ? null : index);

  if (state.status === "loading") return <p>Đang tải...</p>;
  if (state.status === "error") return <p>Lỗi: {state.error}</p>;
  if (state.status === "empty") return <p>Chưa có FAQ nào.</p>;

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
          {state.data.map((faq, index) => (
            <div key={faq.id} className="border-b border-slate-200 pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="faq-question w-full text-left text-lg font-semibold text-slate-800 py-4 flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform shrink-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={openFaq === index ? "block" : "hidden"}>
                <div className="pt-2 pb-4 text-slate-600 prose max-w-none">
                  {/* Dùng ReactMarkdown với function call cho version v10+ */}
                  {ReactMarkdown({ children: faq.answer }) as React.ReactNode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
