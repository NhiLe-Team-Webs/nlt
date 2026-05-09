import { useRef, useEffect, useState } from "react";

export const RegistrationFormSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-12 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[920px] mx-auto">

          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: "#f0f7fb" }}>

            {/* SVG Waves — lấy nguyên từ file HTML gốc */}
            <svg
              viewBox="0 0 900 420"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <rect width="900" height="420" fill="#f0f7fb" />
              <path d="M-50,120 C150,40 300,200 500,140 C700,80 800,220 980,160 L980,300 C800,360 650,200 440,270 C230,340 80,180 -50,240 Z" fill="#c8e6f0" opacity="0.55" />
              <path d="M-50,150 C120,70 280,230 500,165 C720,100 830,250 980,190 L980,310 C800,375 640,215 420,290 C200,365 70,200 -50,265 Z" fill="#b8dce8" opacity="0.45" />
              <path d="M-50,175 C130,100 290,255 510,190 C730,125 840,265 980,210 L980,330 C810,390 660,235 440,305 C220,375 80,225 -50,285 Z" fill="#c5e8e0" opacity="0.40" />
              <path d="M-50,200 C140,125 300,275 520,210 C740,145 845,285 980,225 L980,355 C820,408 670,255 450,325 C230,395 85,245 -50,305 Z" fill="#afd9d0" opacity="0.30" />
              <path d="M-50,230 C100,165 280,320 530,250 C780,180 870,330 980,270 L980,420 L-50,420 Z" fill="#d4eef5" opacity="0.25" />
            </svg>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center py-10 sm:py-14 px-4">

              {/* Inner white card */}
              <div
                className="w-full max-w-[580px] rounded-2xl px-6 sm:px-12 py-8 sm:py-10 text-center"
                style={{
                  background: "rgba(255,255,255,0.82)",
                  boxShadow: "0 4px 24px rgba(26,58,74,0.07)",
                }}
              >
                {/* Label */}
                <p
                  className="text-[11px] sm:text-[12px] font-medium uppercase mb-3"
                  style={{ letterSpacing: "4px", color: "#7aacbe", fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  Thông báo tuyển dụng
                </p>

                {/* Divider */}
                <hr style={{ border: "none", borderTop: "0.8px solid #b8dce8", width: "240px", margin: "0 auto 18px" }} />

                {/* Title */}
                <h2
                  className="text-[28px] sm:text-[36px] md:text-[42px] font-bold leading-tight mb-3"
                  style={{ color: "#1a3a4a", fontFamily: "'Lora', serif", letterSpacing: "0.5px" }}
                >
                  Tạm dừng nhận hồ sơ
                </h2>

                {/* Subtitle */}
                <p
                  className="text-[14px] sm:text-[15px]"
                  style={{ color: "#4a7a8a", letterSpacing: "0.3px", fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  Chúng tôi hiện không nhận hồ sơ ứng tuyển mới.
                </p>

                {/* Divider sm */}
                <hr style={{ border: "none", borderTop: "0.8px solid #c8e8e0", width: "180px", margin: "14px auto" }} />

                {/* Reopen date */}
                <p
                  className="text-[13px] sm:text-[14px] mb-1"
                  style={{ color: "#5a8a9a", fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                  Tuyển dụng sẽ chính thức mở lại vào
                </p>
                <p
                  className="text-[24px] sm:text-[30px] md:text-[34px] font-bold"
                  style={{ color: "#1a5a70", fontFamily: "'Lora', serif", letterSpacing: "2px" }}
                >
                  01 / 06 / 2026
                </p>
              </div>

              {/* Footer — ngoài card, căn giữa banner */}
              <p
                className="text-[11px] sm:text-[12px] font-medium uppercase mt-6"
                style={{ letterSpacing: "3px", color: "#8ab0be", fontFamily: "'Be Vietnam Pro', sans-serif" }}
              >
                HR NHILE TEAM
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
