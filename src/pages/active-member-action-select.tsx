import { useNavigate } from "react-router-dom";
import { ClipboardDocumentCheckIcon, ArrowRightEndOnRectangleIcon, ArrowPathRoundedSquareIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const ActiveMemberActionSelect = () => {
  const navigate = useNavigate();

  const handleOutTeam = () => {
    navigate("/out-team-steps");
  };

  const handleChangeTeam = () => {
    navigate("/dashboard", { state: { userType: "active" } });
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* Wave background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[45%]" style={{ animationDuration: "9s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,160 C180,220 360,80 540,160 C720,240 900,80 1080,160 C1260,240 1350,120 1440,160 L1440,320 L0,320 Z" fill="rgba(139,92,246,0.18)" />
        </svg>
        <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[40%]" style={{ animationDuration: "13s", animationDelay: "-4s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,120 C200,60 400,200 600,120 C800,40 1000,180 1200,110 C1320,70 1380,150 1440,120 L1440,320 L0,320 Z" fill="rgba(236,72,153,0.10)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
            <ClipboardDocumentCheckIcon className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-purple-600 text-xs font-bold tracking-[0.2em] uppercase mb-2">Chọn mục đích</p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1D1D1F] tracking-tight leading-tight mb-3">
            Bạn muốn làm gì hôm nay?
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-sm leading-relaxed">
            Chọn đúng mục đích để hệ thống đưa bạn đến quy trình ngắn gọn và dễ theo dõi nhất.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rời team */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-black text-[#1D1D1F] mb-2">Rời team</h2>
            <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
              Hoàn tất quy trình rời khỏi team theo từng bước rõ ràng.
            </p>
            <button
              onClick={handleOutTeam}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition-all duration-200"
            >
              Bắt đầu ngay
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Chuyển / thêm team */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <ArrowPathRoundedSquareIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-black text-[#1D1D1F] mb-2">Chuyển / thêm team</h2>
            <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
              Đi theo lộ trình ngắn để đổi team hoặc tham gia thêm team.
            </p>
            <button
              onClick={handleChangeTeam}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition-all duration-200"
            >
              Bắt đầu ngay
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/select-role")}
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-purple-600 transition-colors duration-200"
        >
          ← Quay lại
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
      `}</style>
    </div>
  );
};

export default ActiveMemberActionSelect;
