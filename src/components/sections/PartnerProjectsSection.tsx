import { useState } from 'react';

export const PartnerProjectsSection = () => {
  return (
    <section id="partner-projects-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Dự án đã hoàn thành</h2>
          <p className="text-lg text-slate-600 mt-4">
            Những câu chuyện thành công được viết nên từ sự hợp tác và tin tưởng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group relative overflow-hidden rounded-2xl">
            <img src="src\asset\TEAMRISE2.JPG" alt="Project 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">TeamRise</h3>
                <p className="text-slate-300 mt-1">Tại TeamRise (do thầy Danny Loong và cô Deon Senturk sáng lập), chúng tôi đồng hành cùng các doanh nghiệp vừa và nhỏ thông qua giáo dục lãnh đạo chuyên sâu và phát triển tổ chức.
Với đội ngũ huấn luyện dày dặn và góc nhìn chiến lược, TeamRise giúp doanh nghiệp khai mở tiềm năng trọn vẹn của mình.
</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl">
            <img src="src\asset\NSA3.JPG" alt="Project 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">NSA</h3>
                <p className="text-slate-300 mt-1">NSA Kids là quỹ hỗ trợ phi lợi nhuận do NhiLe Foundation và NSA hợp tác với NhiLe Team quản lý, với sứ mệnh triển khai trung tâm trị liệu miễn phí cho trẻ em kém may mắn.
Dự án tập trung vào trị liệu và phục hồi vận động cho các em nhỏ mắc hội chứng SMA (teo cơ tuỷ sống), mất khả năng vận động do tai nạn và nhiều tình trạng khó khăn khác.
</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl md:col-span-2">
            <img src="src\asset\TEAMRISE.JPG" alt="Project 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">This Is Home</h3>
                <p className="text-slate-300 mt-1">This Is Home chuyên cung cấp giải pháp toàn diện, kết nối du khách với văn hoá bản địa và cá nhân hoá hành trình tại Việt Nam.
Với cam kết mang đến trải nghiệm độc đáo và chân thực, mỗi chuyến đi cùng This Is Home không chỉ là hành trình tham quan, mà còn là cơ hội để bạn sống trọn vẹn cùng nhịp sống người Việt – từ văn hoá, ẩm thực đến những câu chuyện đời thường.
</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};