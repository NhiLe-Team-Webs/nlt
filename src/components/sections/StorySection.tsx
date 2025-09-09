import { useEffect, useRef, useState } from 'react';

export const StorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="full-story-page"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight text-center">
            Hành Trình Của NhiLe Team
          </h2>
          <p>
            Chúng tôi tin trong trái tim của mỗi người Việt Nam luôn chứa đựng niềm tin vào sức mạnh của lòng nhân ái và tri thức. Từ một ý tưởng nhỏ nhưng đầy nhiệt huyết, Nhi Le đã biến ước mơ của mình thành hiện thực thông qua việc thành lập <strong>NhiLe Team</strong> – một cộng đồng không chỉ hướng đến sự phát triển của từng cá nhân mà còn cam kết tạo ra giá trị lâu dài cho xã hội, cho Việt Nam và NhiLe Team chính là xuất phát điểm-tiền thân của <strong>NhiLe Foundation</strong> như hiện tại.
          </p>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Người Sáng Lập - Nhi Le: Hành Trình Của Đam Mê Và Tầm Nhìn
            </h3>
            <p>
              Từ những ngày đầu tiên, Nhi Le đã quyết tâm chia sẻ kiến thức và kỹ năng tới với giới trẻ Việt Nam, đặc biệt là những em nhỏ có hoàn cảnh khó khăn. Với tâm huyết không ngừng, Nhi Le đã kêu gọi những người cùng chí hướng tham gia, từ 3 người tiên phong ban đầu, dần dần mở rộng lên 10, 15 và hiện nay là hơn 300 thành viên, cùng với hơn 5000 thành viên tích cực trong cộng đồng lớn mạnh.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Giá Trị Cốt Lõi: Tâm, Tầm, Đức
            </h3>
            <p>NhiLe Team được xây dựng dựa trên ba giá trị cốt lõi:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>Tâm:</strong> Mỗi hành động đều xuất phát từ sự chân thành và tình yêu thương. Chúng tôi tin rằng lòng nhân ái là nền tảng vững chắc để xây dựng một cộng đồng đoàn kết và bền vững.
              </li>
              <li>
                <strong>Tầm:</strong> Chúng tôi nhìn xa hơn, không chỉ là thành công cá nhân mà là sự phát triển của cả cộng đồng. Tầm nhìn của chúng tôi là xây dựng một xã hội nơi mỗi cá nhân đều có cơ hội phát triển tối đa tiềm năng của mình.
              </li>
              <li>
                <strong>Đức:</strong> Sự chính trực là nền tảng của mọi quyết định. Chúng tôi tin thế giới cần những nhà lãnh đạo và những con người tử tế, đặt lợi ích của cộng đồng lên trên hết.
              </li>
            </ul>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Tầm Nhìn: Hoà Quyện Nhưng Không Hoà Tan
            </h3>
            <p>
              NhiLe Team không chỉ làm việc chuyên nghiệp mà còn giữ vững bản sắc Việt Nam. Chúng tôi hướng tới việc xây dựng một cộng đồng người Việt Nam đoàn kết, cùng nhau phát triển theo hướng chuyên nghiệp, có khả năng cạnh tranh trên trường quốc tế nhưng vẫn giữ gìn những giá trị cốt lõi của dân tộc. Đoàn kết là chìa khóa để chúng ta xây dựng một tương lai vươn xa bền vững.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Hướng Đi: Xây Dựng Di Sản Lâu Dài
            </h3>
            <p>
              Chúng tôi thành lập <strong>NhiLe Holding</strong> - những doanh nghiệp chia sẻ cùng nhau một giá trị cốt lõi Tâm-Tầm-Đức, với mục tiêu không chỉ tạo ra lợi nhuận cho hiện tại mà còn đảm bảo di sản NhiLe Team tồn tại và phát triển hơn nữa trong tương lai. Lợi nhuận từ NhiLe Holding sẽ hỗ trợ <strong>Nhi Le Foundation</strong>, giúp đỡ những trẻ em mồ côi, bị cha mẹ bỏ rơi hoặc có hoàn cảnh bất hạnh tiếp tục được học tập và phát triển kỹ năng, bất kể tình hình cá nhân của người sáng lập.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Cấu Trúc Của NhiLe Foundation
            </h3>
            <p>
              NhiLe Foundation được chia thành hai nhánh chính, nhưng đều thuộc về <strong>NhiLe Team</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>Nhóm Tình Nguyện:</strong> Bao gồm những người đã có cuộc sống riêng nhưng chọn cách cống hiến thời gian rảnh để tham gia các hoạt động tình nguyện, góp phần vào sứ mệnh giúp đỡ cộng đồng.
              </li>
              <li>
                <strong>Nhóm Học Nghề:</strong> Tập trung vào việc hỗ trợ những người trẻ gặp nhiều thách thức trong cuộc sống, cung cấp các khóa học về học nghề, kỹ năng, đặc biệt là công nghệ và AI, nhằm trang bị cho họ những công cụ cần thiết để thay đổi cuộc đời và đóng góp cho xã hội.
              </li>
            </ul>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Cơ Hội Nghề Nghiệp Tại NhiLe Holding
            </h3>
            <p>
              Chúng tôi luôn mở rộng cơ hội cho những ai muốn gia nhập <strong>NhiLe Team</strong>. Nếu bạn hoàn thành các chương trình đào tạo nghề, bạn có cơ hội trở thành nhân viên chính thức tại NhiLe Holding. Chúng tôi tìm kiếm những cá nhân tương thích với giá trị và tài năng mà chúng tôi trân trọng. NhiLe Holding không chỉ là nơi tạo ra lợi nhuận mà còn là môi trường phát triển những con người có Tâm, Tầm, và Đức, góp phần xây dựng một cộng đồng bền vững.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Lời Kết: Cùng Nhau Xây Dựng Di Sản
            </h3>
            <p>
              NhiLe Team không chỉ là một công ty hay một tổ chức, mà là hiện thân của một giấc mơ về sự thay đổi bền vững. Đây là di sản mà chúng tôi muốn để lại cho thế hệ sau – một câu chuyện về niềm tin, lòng trắc ẩn và sức mạnh của sự đoàn kết. Để xây dựng di sản này, chúng tôi cần sự góp sức của tất cả mọi người. Đây không chỉ là hành trình của Nhi Le, mà còn là hành trình của tất cả những ai tin vào sự tử tế, chính trực và sức mạnh của cộng đồng.
            </p>
            <p className="mt-4">
              Cảm ơn bạn đã đồng hành cùng chúng tôi. Hãy cùng nhau viết tiếp câu chuyện của NhiLe Team – một câu chuyện về niềm tin, lòng nhân ái và sự phát triển bền vững.
            </p>
          </div>
          <div className="pt-8 text-center">
            <a
              href="#register-form"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg inline-block"
            >
              Tham gia vào NhiLe team ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};