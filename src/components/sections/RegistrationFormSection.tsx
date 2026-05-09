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
      id="register-form"
      ref={sectionRef}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        fontFamily: "'Be Vietnam Pro', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="w-full max-w-[1160px] mx-auto">
          {/* Outer card */}
          <div
            className="relative overflow-hidden rounded-[34px] pt-10 pb-12 sm:pt-12 sm:pb-14"
            style={{
              background:
                "linear-gradient(180deg, #eaf2f7 0%, #e7f0f5 52%, #dfeeed 100%)",
              boxShadow: "0 22px 60px rgba(31,58,74,0.08)",
            }}
          >
            {/* Decorative background shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* left soft band */}
              <div
                className="absolute left-[-140px] top-[90px] w-[420px] h-[90px]"
                style={{
                  background: "rgba(183, 223, 223, 0.28)",
                  transform: "rotate(12deg)",
                  borderRadius: "999px",
                }}
              />

              {/* left wider band */}
              <div
                className="absolute left-[-60px] bottom-[70px] w-[520px] h-[95px]"
                style={{
                  background: "rgba(189, 227, 225, 0.22)",
                  transform: "rotate(12deg)",
                  borderRadius: "999px",
                }}
              />

              {/* right stripe 1 */}
              <div
                className="absolute right-[90px] top-[-120px] w-[110px] h-[760px]"
                style={{
                  background: "rgba(132, 194, 189, 0.18)",
                  transform: "rotate(-18deg)",
                  borderRadius: "14px",
                }}
              />

              {/* right stripe 2 */}
              <div
                className="absolute right-[28px] top-[-120px] w-[56px] h-[760px]"
                style={{
                  background: "rgba(170, 214, 209, 0.14)",
                  transform: "rotate(-18deg)",
                  borderRadius: "14px",
                }}
              />
            </div>

            {/* Inner white card */}
            <div
              className="relative z-10 w-[92%] sm:w-[88%] mx-auto rounded-[28px] px-6 sm:px-10 md:px-16 py-10 sm:py-12 text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(252,255,255,0.96) 100%)",
                boxShadow: "0 12px 32px rgba(31,58,74,0.05)",
                border: "1px solid rgba(255,255,255,0.78)",
              }}
            >
              {/* Eyebrow */}
              <p
                className="text-[12px] sm:text-[13px] font-bold uppercase mb-4"
                style={{
                  color: "#7f9aa0",
                  letterSpacing: "0.34em",
                }}
              >
                Thông báo tuyển dụng
              </p>

              <div
                className="h-px w-[240px] sm:w-[320px] mx-auto mb-7"
                style={{ background: "rgba(144,171,177,0.26)" }}
              />

              {/* Title */}
              <h2
                className="text-[34px] sm:text-[46px] md:text-[64px] font-bold leading-[1.08] mb-5 md:whitespace-nowrap"
                style={{
                  color: "#223a48",
                  fontFamily: "'Lora', serif",
                  letterSpacing: "0.005em",
                }}
              >
                Tạm dừng nhận hồ sơ
              </h2>

              {/* Subtitle */}
              <p
                className="text-[17px] sm:text-[20px] font-semibold mb-6"
                style={{ color: "#6f8790" }}
              >
                Chúng tôi hiện không nhận hồ sơ ứng tuyển mới.
              </p>

              <div
                className="h-px w-[180px] sm:w-[250px] mx-auto mb-5"
                style={{ background: "rgba(144,171,177,0.22)" }}
              />

              {/* Reopen label */}
              <p
                className="text-[15px] sm:text-[17px] font-semibold mb-3"
                style={{ color: "#6f8790" }}
              >
                Tuyển dụng sẽ chính thức mở lại vào
              </p>

              {/* Date */}
              <p
                className="text-[30px] sm:text-[42px] md:text-[52px] font-extrabold leading-none"
                style={{
                  color: "#223a48",
                  letterSpacing: "0.14em",
                }}
              >
                01 / 06 / 2026
              </p>
            </div>

            {/* Footer outside white card */}
            <p
              className="relative z-10 text-center text-[12px] sm:text-[13px] font-bold uppercase mt-10"
              style={{
                color: "#8aa2a8",
                letterSpacing: "0.38em",
              }}
            >
              HR NHILE TEAM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};