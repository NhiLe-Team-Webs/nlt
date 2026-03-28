import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, Calendar, Video, ClipboardCheck, LogOut,
  ChevronLeft, ChevronRight, ShieldCheck, Clock,
  ArrowRight, BookOpen, X, FileText,
} from "lucide-react";
import OutTeamQuizModal from "../components/out-team/out-team-quiz-modal";
import OutTeamCalendarModal from "../components/out-team/out-team-calendar-modal";
import OutTeamStepModal from "../components/out-team/out-team-step-modal";
import OutTeamChatWidget from "../components/out-team/out-team-chat-widget";
import OutTeamProcedureModal from "../components/out-team/out-team-procedure-modal";

const STEPS = [
  { id: 1, title: "Làm bài test",           desc: "Tìm hiểu giá trị cốt lõi tại NhiLe Team.",       icon: <ClipboardCheck className="w-6 h-6" /> },
  { id: 2, title: "Đặt lịch phỏng vấn",    desc: "Chọn thời gian phù hợp để gặp gỡ trao đổi nhé.", icon: <Calendar className="w-6 h-6" /> },
  { id: 3, title: "Chờ kết quả phỏng vấn", desc: "Kiểm tra email thường xuyên.",                     icon: <Video className="w-6 h-6" /> },
  { id: 4, title: "Hoàn thành thủ tục",    desc: "Hoàn thiện các giấy tờ và thủ tục cần thiết.",    icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 5, title: "Chờ Admin xác nhận",    desc: "Admin sẽ xác nhận và liên hệ lại với bạn.",       icon: <Clock className="w-6 h-6" /> },
];

const OutTeamSteps = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded]               = useState(false);
  const [currentStep, setCurrentStep]         = useState(1);
  const [isQuizOpen, setIsQuizOpen]           = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen]   = useState(false);
  const [docModalView, setDocModalView]       = useState<"menu" | "video" | "text">("menu");
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [showStepModal, setShowStepModal]     = useState(false);
  const [stepModalContext, setStepModalContext] = useState<"quiz" | "calendar" | "interview-result">("quiz");

  useEffect(() => { setIsLoaded(true); }, []);

  const advance = () => {
    setShowStepModal(false);
    setCurrentStep(p => Math.min(p + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = (stepId: number) => {
    if (stepId === 1) return (
      <div className="space-y-3 mt-2">
        <button onClick={() => { setIsDocModalOpen(true); setDocModalView("menu"); }}
          className="btn-pop w-full flex items-center justify-center gap-2 py-3 px-4 border border-purple-200 rounded-2xl text-purple-600 font-bold text-sm hover:bg-purple-50 transition-colors">
          <BookOpen size={15} /> Đọc tài liệu Văn hoá trước khi Test
        </button>
        <button onClick={() => setIsQuizOpen(true)}
          className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20">
          Bắt đầu thực hiện <ArrowRight size={16} />
        </button>
      </div>
    );

    if (stepId === 2) return (
      <div className="mt-2">
        <button onClick={() => setIsCalendarModalOpen(true)}
          className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20">
          Bắt đầu thực hiện <ArrowRight size={16} />
        </button>
      </div>
    );

    if (stepId === 4) return (
      <div className="mt-2">
        <button onClick={() => setIsProcedureModalOpen(true)}
          className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20">
          Bắt đầu thực hiện <ArrowRight size={16} />
        </button>
      </div>
    );

    if (stepId === 3) return (
      <div className="space-y-3 mt-2">
        <p className="text-sm text-gray-500 leading-relaxed text-center">
          Chúng mình sẽ liên hệ qua Gmail bạn đã đăng ký. Nhớ kiểm tra cả mục Spam nhé!
        </p>
        <button onClick={() => { setStepModalContext("interview-result"); setShowStepModal(true); }}
          className="btn-pop w-full flex items-center justify-center gap-2 py-4 px-4 bg-purple-600 rounded-2xl text-white font-black text-sm hover:bg-purple-700 shadow-lg shadow-purple-500/20">
          Bắt đầu thực hiện <ArrowRight size={16} />
        </button>
      </div>
    );

    return null;
  };

  const activeStep = STEPS.find(s => s.id === currentStep)!;

  return (
    <div className={`flex min-h-[100dvh] font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

      {/* ── Sidebar ── */}
      <aside className={`relative flex flex-col shrink-0 border-r border-gray-100 bg-white transition-all duration-300 p-5 ${isSidebarCollapsed ? "w-[72px]" : "w-60"}`}>
        <button onClick={() => setSidebarCollapsed(p => !p)} className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-10">
          {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        <div className="flex justify-center mb-8 pt-4">
          <img src="/logo.svg" alt="NhiLe Team" className={`object-contain transition-all duration-300 ${isSidebarCollapsed ? "w-10 h-10" : "w-28 h-28"}`} />
        </div>
        <nav className="flex-1">
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isActive    = step.id === currentStep;
            const isLast      = idx === STEPS.length - 1;
            const nextCompleted = !isLast && STEPS[idx + 1].id < currentStep;
            return (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-all duration-500 ${isCompleted ? "bg-green-500 text-white shadow-md shadow-green-200" : isActive ? "bg-purple-600 text-white shadow-md shadow-purple-200" : "border-2 border-gray-200 text-gray-400"}`}>
                    {isCompleted ? <CheckCircle2 size={13} /> : step.id}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 my-1 rounded-full overflow-hidden bg-gray-100" style={{ minHeight: "20px" }}>
                      <div className={`w-full transition-all duration-700 rounded-full ${isCompleted && nextCompleted ? "h-full bg-green-400" : isCompleted ? "h-full bg-green-300" : "h-0"}`} />
                    </div>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <div className="pb-3 pt-1">
                    <span className={`text-[10px] font-black uppercase tracking-wide leading-tight transition-colors ${isActive ? "text-purple-600" : isCompleted ? "text-gray-500" : "text-gray-300"}`}>
                      {step.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-6 border-t border-gray-100 pt-4">
          <button onClick={() => navigate("/active-member-action")} className="btn-pop flex items-center gap-2 px-1 py-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-black">
            <LogOut size={15} className="shrink-0" /> {!isSidebarCollapsed && "Quay lại"}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 relative bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-6 md:p-10 min-h-screen overflow-hidden">
        {/* Wave background — 4 layers matching Dashboard */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[45%]" style={{ animationDuration: "9s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,160 C180,220 360,80 540,160 C720,240 900,80 1080,160 C1260,240 1350,120 1440,160 L1440,320 L0,320 Z" fill="rgba(139,92,246,0.18)" />
          </svg>
          <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[40%]" style={{ animationDuration: "13s", animationDelay: "-4s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,120 C200,60 400,200 600,120 C800,40 1000,180 1200,110 C1320,70 1380,150 1440,120 L1440,320 L0,320 Z" fill="rgba(236,72,153,0.10)" />
          </svg>
          <svg className="wave-layer absolute bottom-0 left-0 w-[200%] h-[32%]" style={{ animationDuration: "17s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,200 C160,140 320,260 480,200 C640,140 800,240 960,180 C1120,120 1300,220 1440,180 L1440,320 L0,320 Z" fill="rgba(196,181,253,0.20)" />
          </svg>
          <svg className="wave-layer absolute top-0 left-0 w-[200%] h-[30%]" style={{ animationDuration: "11s", animationDelay: "-2s" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,0 L0,0 Z" fill="rgba(167,139,250,0.10)" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-8 max-w-md">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Chào mừng bạn!</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base leading-relaxed">
            Cùng hoàn tất các bước để hoàn thành quy trình rời team nhé.
          </p>
        </div>

        {/* Active step card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-lg border border-white/60">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-purple-500">
            {activeStep.icon}
          </div>
          <p className="text-center text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-1.5">BƯỚC {activeStep.id}</p>
          <h2 className="text-center text-2xl font-black text-gray-900 mb-1.5">{activeStep.title}</h2>
          <p className="text-center text-gray-500 text-sm mb-4 leading-relaxed">{activeStep.desc}</p>
          {renderContent(activeStep.id)}
        </div>
      </main>

      {/* ── Doc modal ── */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={() => setIsDocModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[1.5rem] shadow-2xl modal-pop">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {docModalView !== "menu" ? (
                  <button onClick={() => setDocModalView("menu")} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs font-bold">
                    <ChevronLeft size={14} /> Quay lại
                  </button>
                ) : (
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">TÀI LIỆU</span>
                )}
              </div>
              <button onClick={() => { setIsDocModalOpen(false); setDocModalView("menu"); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            {docModalView === "menu" && (
              <div className="p-6 space-y-4">
                <h3 className="text-center text-lg font-black text-gray-900">Bạn muốn xem tài liệu nào?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setDocModalView("video")} className="btn-pop flex flex-col items-center gap-2.5 p-5 border border-gray-100 bg-gray-50 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-colors">
                    <Video size={26} className="text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">Xem Video</span>
                  </button>
                  <button onClick={() => setDocModalView("text")} className="btn-pop flex flex-col items-center gap-2.5 p-5 border border-gray-100 bg-gray-50 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-colors">
                    <FileText size={26} className="text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">Đọc Văn Bản</span>
                  </button>
                </div>
              </div>
            )}
            {docModalView === "video" && (
              <div className="p-4">
                <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm font-medium">
                  [Video Của Team Sẽ Hiện Ở Đây]
                </div>
              </div>
            )}
            {docModalView === "text" && (
              <div className="p-6 max-h-72 overflow-y-auto">
                <h3 className="font-black text-gray-900 mb-3 text-base">Giá trị cốt lõi NhiLe Team</h3>
                <ol className="space-y-2.5 text-sm text-gray-600">
                  <li>1. Luôn đúng giờ và chủ động báo cáo tiến độ.</li>
                  <li>2. Góp ý thẳng thắn, mang tính xây dựng vì mục tiêu chung.</li>
                  <li>3. Bảo mật tuyệt đối các thông tin dự án chưa public.</li>
                  <li className="text-gray-400 italic text-xs mt-2">(Nội dung văn bản chi tiết sẽ được thêm vào đây...)</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Quiz modal ── */}
      <OutTeamQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onPass={() => { setStepModalContext("quiz"); setShowStepModal(true); }}
      />

      {/* ── Calendar modal ── */}
      <OutTeamCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        onConfirm={() => { setIsCalendarModalOpen(false); setStepModalContext("calendar"); setShowStepModal(true); }}
      />

      {/* ── Procedure modal ── */}
      <OutTeamProcedureModal
        isOpen={isProcedureModalOpen}
        onClose={() => setIsProcedureModalOpen(false)}
        onSubmit={() => { setIsProcedureModalOpen(false); setStepModalContext("interview-result"); setShowStepModal(true); }}
      />

      {/* ── Step complete modal ── */}
      <OutTeamStepModal isOpen={showStepModal} context={stepModalContext} onContinue={advance} />

      {/* ── Chat widget ── */}
      <OutTeamChatWidget />

      <style>{`
        @keyframes modal-pop {
          0%   { opacity: 0; transform: scale(0.88) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.015) translateY(-2px); }
          80%  { transform: scale(0.995) translateY(1px); }
          100% { transform: scale(1) translateY(0); }
        }
        .modal-pop { animation: modal-pop 0.28s cubic-bezier(0.34, 1.3, 0.64, 1) forwards; }
        @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }
        .overlay-in { animation: overlay-in 0.2s ease forwards; }
        .btn-pop:active { transform: scale(0.95); }
        .btn-pop { transition: transform 0.1s ease, box-shadow 0.2s ease; }
        .btn-pop:hover { transform: scale(1.02); }
        @keyframes wave-flow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .wave-layer { animation: wave-flow ease-in-out infinite alternate; will-change: transform; }
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-slide-up { animation: chat-slide-up 0.22s cubic-bezier(0.34, 1.3, 0.64, 1) forwards; }
        @keyframes icon-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .icon-float { animation: icon-float 2s ease-in-out infinite; }
        @keyframes icon-spin-pop { 0% { opacity: 0; transform: scale(0.5) rotate(-20deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        .icon-spin-pop { animation: icon-spin-pop 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default OutTeamSteps;
