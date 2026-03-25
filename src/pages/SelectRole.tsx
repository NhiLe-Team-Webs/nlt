import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, UserIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const SelectRole = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const roles = [
    { id: "new", label: "Lần đầu vào team", icon: <UserPlusIcon className="w-5 h-5" /> },
    { id: "returning", label: "Thành viên quay lại", icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: "active", label: "Thành viên đang hoạt động", icon: <UserIcon className="w-5 h-5" /> },
  ];

  const handleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    // Haptic feedback for tactile selection feel
    if (window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }
  };

  const handleContinue = () => {
    if (role) {
      localStorage.setItem("nlt_userType", role);
      navigate("/dashboard", { state: { userType: role } });
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex(prev => (prev < roles.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : roles.length - 1));
      } else if (e.key === "Enter") {
        if (focusedIndex !== -1) {
          handleSelect(roles[focusedIndex].id);
        } else if (role) {
          handleContinue();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, role]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* Wave background — identical to Dashboard main area */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[45%]" style={{animationDuration:"9s"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C180,220 360,80 540,160 C720,240 900,80 1080,160 C1260,240 1350,120 1440,160 L1440,320 L0,320 Z" fill="rgba(139,92,246,0.18)" />
        </svg>
        <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[40%]" style={{animationDuration:"13s", animationDelay:"-4s"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,120 C200,60 400,200 600,120 C800,40 1000,180 1200,110 C1320,70 1380,150 1440,120 L1440,320 L0,320 Z" fill="rgba(236,72,153,0.10)" />
        </svg>
        <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[32%]" style={{animationDuration:"17s"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,200 C160,140 320,260 480,200 C640,140 800,240 960,180 C1120,120 1300,220 1440,180 L1440,320 L0,320 Z" fill="rgba(196,181,253,0.20)" />
        </svg>
        <svg className="wave-layer absolute top-0 left-0 w-[200%] h-[30%]" style={{animationDuration:"11s", animationDelay:"-2s"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,0 L0,0 Z" fill="rgba(167,139,250,0.10)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-10 md:p-12 flex flex-col items-center text-center border border-white/60">

        {/* Animated Logo Container */}
        <div className="mb-4 md:mb-6">
          <img
            src="/logo.webp"
            alt="NhiLe Team Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain shadow-2xl shadow-purple-600/10 hover:scale-110 transition-transform duration-500 cursor-pointer"
          />
        </div>

        {/* Typography */}
        <div className="space-y-2 mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1D1D1F] tracking-tight leading-tight">
            Tham Gia Ngay
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed max-w-[280px] sm:max-w-md mx-auto">
            Chào mừng bạn đến với hành trình phụng sự cùng <span className="text-purple-600 font-black">NhiLe Team.</span>
          </p>
        </div>

        {/* Selection Chips */}
        <div className="w-full flex flex-col gap-2 mb-8">
          {roles.map((r, index) => (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 min-h-[52px] rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden
                ${role === r.id
                  ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-500/20 scale-[1.02]"
                  : focusedIndex === index
                    ? "border-purple-100 bg-purple-50 text-purple-600"
                    : "border-gray-50 bg-[#F3F4F6] text-gray-600"
                }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${role === r.id ? "bg-white/20 text-white" : "bg-white text-purple-600"}`}>
                {r.icon}
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight">
                {r.label}
              </span>

              {role === r.id && (
                <div className="ml-auto animate-in zoom-in duration-300">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!role}
          className={`btn-pop w-full group flex items-center justify-center gap-3 py-5 rounded-[1.5rem] text-lg sm:text-xl font-black transition-all duration-300 shadow-xl active:scale-95
            ${role
              ? "bg-purple-600 text-white shadow-purple-500/20 hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-0.5"
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
        >
          Tiếp tục
          <ArrowRightIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 ${role ? "group-hover:translate-x-2 animate-pulse-horizontal" : ""}`} />
        </button>
      </div>



      <style>{`
        @keyframes wave-flow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .wave-layer {
          animation: wave-flow ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes pulse-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-pulse-horizontal {
          animation: pulse-horizontal 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SelectRole;
