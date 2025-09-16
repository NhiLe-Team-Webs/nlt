// src/components/sections/BlogSection.tsx
import { useState } from "react";

export const BlogSection = () => {
  return (
    <section id="blog-page" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          {/* ======== TIÊU ĐỀ ======== */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight text-center">
            Tin tức & Câu chuyện
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto">
            Cập nhật những hoạt động, chia sẻ và câu chuyện truyền cảm hứng từ
            cộng đồng NhiLe Team.
          </p>

          {/* ======== KHU VỰC BLOG ======== */}
          <div className="grid md:grid-cols-3 gap-8 pt-8">
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
                  Cùng nhìn lại chuyến đi thiện nguyện đặc biệt, nơi tri thức được gieo mầm tại những bản làng xa xôi...
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
                  Khám phá câu chuyện truyền cảm hứng của một bạn trẻ đã gắn bó và trưởng thành cùng NhiLe Team.
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
                  Làm việc nhóm hiệu quả không chỉ giúp đạt mục tiêu nhanh hơn, mà còn rèn luyện khả năng lãnh đạo và giao tiếp.
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
      </div>
    </section>
  );
};
