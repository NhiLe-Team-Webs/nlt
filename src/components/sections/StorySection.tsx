// src/components/sections/StorySection.tsx
import { useState } from "react";

export const StorySection = () => {
  return (
    <section id="full-story-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          {/* ======== PHẦN CÂU CHUYỆN ======== */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight text-center">
            Hành Trình Của NhiLe Team
          </h2>
          <p>
            Chúng tôi tin trong trái tim của mỗi người Việt Nam luôn chứa đựng
            niềm tin vào sức mạnh của lòng nhân ái và tri thức. Từ một ý tưởng nhỏ
            nhưng đầy nhiệt huyết, Nhi Le đã biến ước mơ của mình thành hiện thực
            thông qua việc thành lập <strong>NhiLe Team</strong> – một cộng đồng
            không chỉ hướng đến sự phát triển của từng cá nhân mà còn cam kết tạo
            ra giá trị lâu dài cho xã hội...
          </p>

          {/* ======== KHU VỰC TIN TỨC & CÂU CHUYỆN ======== */}
          <div className="pt-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Tin tức & Câu chuyện
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Blog Card 1 - Thiện nguyện */}
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src="/images/blogs/thien-nguyen.jpg"
                  alt="Thiện nguyện"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium">
                    Thiện nguyện • 28/08/2025
                  </p>
                  <h4 className="text-xl font-semibold text-slate-900 mt-2">
                    Sách hành động đến với trẻ em vùng cao
                  </h4>
                  <p className="text-slate-600 mt-2">
                    Cùng nhìn lại chuyến đi thiện nguyện đặc biệt, nơi tri thức
                    được gieo mầm tại những bản làng xa xôi...
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Đọc thêm →
                  </a>
                </div>
              </div>

              {/* Blog Card 2 - Thành viên */}
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src="/images/blogs/thanh-vien.jpg"
                  alt="Thành viên"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium">
                    Thành viên • 15/09/2025
                  </p>
                  <h4 className="text-xl font-semibold text-slate-900 mt-2">
                    Chân dung một thành viên: Từ người mới đến lãnh đạo
                  </h4>
                  <p className="text-slate-600 mt-2">
                    Khám phá câu chuyện truyền cảm hứng của một bạn trẻ đã gắn bó
                    và trưởng thành cùng NhiLe Team.
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Đọc thêm →
                  </a>
                </div>
              </div>

              {/* Blog Card 3 - Kỹ năng */}
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src="/images/blogs/ky-nang.jpg"
                  alt="Kỹ năng"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium">
                    Kỹ năng • 01/10/2025
                  </p>
                  <h4 className="text-xl font-semibold text-slate-900 mt-2">
                    5 kỹ năng quan trọng khi làm việc nhóm
                  </h4>
                  <p className="text-slate-600 mt-2">
                    Làm việc nhóm hiệu quả không chỉ giúp đạt mục tiêu nhanh hơn,
                    mà còn rèn luyện khả năng lãnh đạo và giao tiếp.
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Đọc thêm →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-12 text-center">
            <a
              href="#register-form"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
            >
              Tham gia vào NhiLe Team ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
