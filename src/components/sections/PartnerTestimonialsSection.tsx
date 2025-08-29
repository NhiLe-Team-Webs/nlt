import { useState } from 'react';

export const PartnerTestimonialsSection = () => {
  return (
    <section id="partner-testimonials-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Đối tác nói gì về chúng tôi?</h2>
          <p className="text-lg text-slate-600 mt-4">
            Niềm tin của đối tác là thước đo cho sự thành công của NhiLe Team.
          </p>
        </div>
        <div className="space-y-20">
          {/* Testimonial 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-8 section-fade-in">
            <img src="https://placehold.co/400x400/e2e8f0/334155?text=Danny" alt="Danny Loong" className="w-40 h-40 rounded-full object-cover shadow-lg flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xl text-slate-700 italic leading-relaxed">"Đội ngũ NhiLe Team tràn đầy sự tích cực và năng lượng tốt. Sự đồng đều và trơn tru khi làm việc cùng họ làm tôi rất bất ngờ, ngôn ngữ đã không còn là rào cản khi làm việc cùng NhiLe Team."</p>
              <p className="mt-4 font-bold text-slate-900">- Danny Loong</p>
              <p className="text-slate-500">CEO Timbre Group</p>
            </div>
          </div>
          
          {/* Testimonial 2 (Video) */}
          <div className="flex flex-col sm:flex-row-reverse items-center gap-8 section-fade-in">
            <div className="relative group cursor-pointer w-full sm:w-2/3 flex-shrink-0">
              <img src="https://placehold.co/800x450/475569/ffffff?text=Video+Review" className="rounded-xl w-full shadow-lg" alt="Video thumbnail" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-xl">
                <button className="bg-white/30 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center sm:text-right w-full sm:w-1/3">
              <p className="text-xl text-slate-700 italic leading-relaxed">"Sự chuyên nghiệp và tận tâm của các bạn đã vượt xa kỳ vọng của chúng tôi. Một trải nghiệm hợp tác tuyệt vời!"</p>
              <p className="mt-4 font-bold text-slate-900">- Jane Doe</p>
              <p className="text-slate-500">Project Manager, Innovate Inc.</p>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="flex flex-col sm:flex-row items-center gap-8 section-fade-in">
            <img src="https://placehold.co/400x400/94a3b8/334155?text=John" alt="John Smith" className="w-40 h-40 rounded-full object-cover shadow-lg flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xl text-slate-700 italic leading-relaxed">"Năng lượng và sự sáng tạo của NhiLe Team thực sự truyền cảm hứng. Chúng tôi mong chờ những dự án hợp tác tiếp theo."</p>
              <p className="mt-4 font-bold text-slate-900">- John Smith</p>
              <p className="text-slate-500">Marketing Director, Creative Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};