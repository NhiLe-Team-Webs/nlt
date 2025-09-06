import { useState } from 'react';

export const CommunityLeadersSection = () => {
  return (
    <section id="community-leaders-page" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Leaders Cộng Đồng Chúng Tôi</h2>
          <p className="text-lg text-slate-600 mt-4">
            Những người dẫn dắt, truyền cảm hứng và xây dựng nền tảng cho sự phát triển vững mạnh của NhiLe Team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Leader Card 1: Founder */}
          <div className="group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04]">
            <img className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" src="https://placehold.co/400x400/e2e8f0/334155?text=Nhi+Le" alt="Chân dung Nhi Le" />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900">Nhi Le</h3>
              <p className="text-slate-500 font-medium">Người Sáng Lập</p>
              <p className="text-slate-600 text-sm mt-2 h-24">Với tầm nhìn và đam mê, Nhi Le đã đặt những viên gạch đầu tiên, xây dựng NhiLe Team từ con số 0 trở thành một cộng đồng lớn mạnh.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Other Leader Cards */}
          <div className="group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04]">
            <img className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" src="https://placehold.co/400x400/e2e8f0/334155?text=Leader+A" alt="Chân dung Leader A" />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900">Trần Minh Anh</h3>
              <p className="text-slate-500 font-medium">Trưởng Ban Đào Tạo</p>
              <p className="text-slate-600 text-sm mt-2 h-24">Chịu trách nhiệm xây dựng chương trình học, đảm bảo chất lượng và lộ trình phát triển chuyên môn cho từng thành viên.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04]">
            <img className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" src="https://placehold.co/400x400/e2e8f0/334155?text=Leader+B" alt="Chân dung Leader B" />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900">Lê Hoàng Bách</h3>
              <p className="text-slate-500 font-medium">Quản Lý Cộng Đồng</p>
              <p className="text-slate-600 text-sm mt-2 h-24">Là cầu nối giữa các thành viên, tổ chức các hoạt động gắn kết và hỗ trợ mọi người trong suốt quá trình tham gia.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="group text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.04]">
            <img className="w-40 h-40 rounded-full mx-auto ring-4 ring-slate-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl" src="https://placehold.co/400x400/e2e8f0/334155?text=Leader+C" alt="Chân dung Leader C" />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-slate-900">Phạm Thuỳ Linh</h3>
              <p className="text-slate-500 font-medium">Trưởng Dự Án Đối Ngoại</p>
              <p className="text-slate-600 text-sm mt-2 h-24">Phụ trách kết nối với các đối tác, mở rộng cơ hội hợp tác và phát triển các dự án mang lại giá trị cho cộng đồng.</p>
              <div className="mt-4 flex justify-center space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-900">Bạn có tố chất của một nhà lãnh đạo?</h3>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">Hãy tham gia cùng chúng tôi để phát triển tiềm năng của bạn và cùng nhau tạo ra sự thay đổi.</p>
          <a href="#register-form" data-target="home" className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block">
            Trở thành thành viên
          </a>
        </div>
      </div>
    </section>
  );
};