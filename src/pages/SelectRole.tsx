import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, UserIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const SelectRole = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const roles = [
    { id: "new", label: "Lần đầu vào team", icon: <UserPlusIcon className="w-5 h-5" /> },
    { id: "returning", label: "Cựu thành viên quay lại", icon: <UserGroupIcon className="w-5 h-5" /> },
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
    <div className="min-h-[100dvh] bg-[#F9F9F9] flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-10 md:p-12 flex flex-col items-center text-center border border-white/50">
        
        {/* Animated Logo Container */}
        <div className="mb-4 md:mb-6">
          <img 
            src="/logo.webp" 
            alt="NhiLe Team Logo" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain shadow-2xl shadow-blue-600/10 hover:scale-110 transition-transform duration-500 cursor-pointer" 
          />
        </div>

        {/* Typography */}
        <div className="space-y-2 mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1D1D1F] tracking-tight leading-tight">
            Tham Gia Ngay
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed max-w-[280px] sm:max-w-md mx-auto">
            Chào mừng bạn đến với hành trình phụng sự cùng <span className="text-[#3B82F6] font-black">NhiLe Team.</span>
          </p>
        </div>

        {/* Selection Chips - Flat Layout for GenZ speed */}
        <div className="w-full flex flex-col gap-2 mb-8">
          {roles.map((r, index) => (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 min-h-[52px] rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden
                ${role === r.id 
                  ? "border-[#3B82F6] bg-[#3B82F6] text-white shadow-lg shadow-blue-600/20 scale-[1.02]" 
                  : focusedIndex === index
                    ? "border-blue-100 bg-[#DBEAFE] text-[#3B82F6]"
                    : "border-gray-50 bg-[#F3F4F6] text-gray-600"
                }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${role === r.id ? "bg-white/20 text-white" : "bg-white text-[#3B82F6]"}`}>
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

        {/* High-CTA Continue Button with Gradient */}
        <button
          onClick={handleContinue}
          disabled={!role}
          className={`w-full group flex items-center justify-center gap-3 py-5 rounded-[1.5rem] text-lg sm:text-xl font-black transition-all duration-500 shadow-xl active:scale-95
            ${role 
              ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-blue-600/30 hover:shadow-2xl hover:-translate-y-1" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
        >
          Tiếp tục
          <ArrowRightIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 ${role ? "group-hover:translate-x-2 animate-pulse-horizontal" : ""}`} />
        </button>
      </div>



      <style>{`
        .py-4\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
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
