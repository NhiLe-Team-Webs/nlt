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
            <img src="https://placehold.co/800x1000/1e293b/ffffff?text=Project+1" alt="Project 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">Dự Án A</h3>
                <p className="text-slate-300 mt-1">Đối tác TechCorp</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl">
            <img src="https://placehold.co/800x1000/475569/ffffff?text=Project+2" alt="Project 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">Dự Án B</h3>
                <p className="text-slate-300 mt-1">Tổ chức EduNext</p>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl md:col-span-2">
            <img src="https://placehold.co/1600x1000/94a3b8/ffffff?text=Project+3" alt="Project 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white">Dự Án C</h3>
                <p className="text-slate-300 mt-1">Quỹ Vì Cộng Đồng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};