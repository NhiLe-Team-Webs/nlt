import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  CheckCircle2, 
  Calendar, 
  Video, 
  FileText, 
  ArrowRight, 
  Clock,
  User,
  Lock,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ClipboardCheck,
  BrainCircuit,
  Mail,
  PartyPopper,
  Zap
} from "lucide-react";

// Move static data outside to prevent re-renders
const SKILL_QUESTIONS = [
  { q: "Bạn xử lý thế nào khi gặp task khó?", a: ["Bỏ qua", "Hỏi Mentor ngay", "Nghiên cứu rồi mới hỏi", "Để đó mai tính"], correct: 2 },
  { q: "NhiLe Team ưu tiên điều gì nhất?", a: ["Tốc độ", "Chất lượng & Thái độ", "Sự nổi tiếng", "Lợi nhuận"], correct: 1 },
  { q: "Khi làm việc nhóm, bạn sẽ?", a: ["Làm một mình", "Chờ nhắc việc", "Chủ động đề xuất", "Chỉ làm phần mình"], correct: 2 }
];

const CULTURE_QUESTIONS = [
  { q: "Văn hóa 'Hỗ trợ' tại NLT nghĩa là?", a: ["Làm hộ việc", "Cùng nhau giải quyết", "Kệ ai nấy làm", "Chỉ hỗ trợ Leader"], correct: 1 },
  { q: "Giao tiếp trong Team cần đảm bảo?", a: ["Sự trung thực", "Nói gì cũng được", "Chỉ nói tin tốt", "Im lặng là vàng"], correct: 0 },
  { q: "Bạn mong muốn điều gì nhất tại NLT?", a: ["Lương cao", "Môi trường học hỏi", "Sự ổn định", "Làm ít hưởng nhiều"], correct: 1 }
];

const QUIZ_STEPS_DATA = {
  active: {
    skill: { title: "Test Văn Hóa", desc: "Ôn lại giá trị cốt lõi NhiLe Team cho Core Member." },
    culture: { title: "Test Văn Hóa", desc: "Cùng tìm hiểu và hòa nhập giá trị NhiLe Team." }
  },
  new: {
    skill: { title: "Test Năng Lực", desc: "Thực hiện bài test để chúng mình hiểu sự phù hợp nha." },
    culture: { title: "Test Văn Hóa", desc: "Tìm hiểu giá trị cốt lõi tại NhiLe Team." }
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Quiz Modal States
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeQuizType, setActiveQuizType] = useState<"skill" | "culture" | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const currentQuestions = activeQuizType === "skill" ? SKILL_QUESTIONS : CULTURE_QUESTIONS;

  const handleQuizSubmit = () => {
    setShowQuizResult(true);
    setTimeout(() => {
      setIsQuizModalOpen(false);
      setShowQuizResult(false);
      setCurrentQuestionIndex(0);
      setQuizAnswers([]);
      setCurrentStep(activeQuizType === "skill" ? 2 : 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500); // Reduced delay for snappier feel
  };
  
  const userType = location.state?.userType || 'new';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Bài test năng lực',
      desc: userType === 'active' ? QUIZ_STEPS_DATA.active.skill.desc : QUIZ_STEPS_DATA.new.skill.desc,
      icon: <BrainCircuit className="w-6 h-6" />,
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'locked',
      customContent: (
        <div className="mt-6 space-y-3 transition-all duration-300">
           <button
              onClick={() => { setActiveQuizType("skill"); setIsQuizModalOpen(true); }}
              className="bg-white text-blue-600 border border-blue-600/30 px-6 py-3.5 rounded-2xl font-black text-sm shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Làm bài test năng lực <ArrowRight size={16} />
            </button>
        </div>
      )
    },
    {
      id: 2,
      title: 'Bài test văn hóa',
      desc: 'Tìm hiểu giá trị cốt lõi tại NhiLe Team.',
      icon: <ClipboardCheck className="w-6 h-6" />,
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'locked',
      customContent: (
        <div className="mt-6 transition-all duration-300">
           <button
              onClick={() => { setActiveQuizType("culture"); setIsQuizModalOpen(true); }}
              className="bg-white text-blue-600 border border-blue-600/30 px-6 py-3.5 rounded-2xl font-black text-sm shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Làm bài test văn hoá <ArrowRight size={16} />
            </button>
        </div>
      )
    },
    {
      id: 3,
      title: 'Đặt lịch phỏng vấn',
      desc: 'Chọn thời gian phù hợp để gặp gỡ trao đổi trực tiếp nhé.',
      icon: <Calendar className="w-6 h-6" />,
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'locked',
      customContent: (
        <div className="mt-8 space-y-8 transition-all duration-300">
           {/* Inline Calendar UI */}
           <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
             <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1 space-y-4">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-black text-sm text-[#1D1D1F] uppercase tracking-wider">Tháng 3, 2026</h4>
                   <div className="flex gap-2">
                     <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={16} className="rotate-180" /></button>
                     <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={16} /></button>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-7 gap-1 text-center">
                   {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                     <span key={day} className="text-[10px] font-black text-gray-300 uppercase py-2">{day}</span>
                   ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(date => {
                      const isAvailable = [16, 17, 19].includes(date);
                      const isHighDemand = [16].includes(date);
                      const isFullyBooked = [15, 18].includes(date);
                      const isSelected = date === 16;
                      const isToday = date === new Date().getDate(); 
                      return (
                        <button 
                          key={date}
                          disabled={!isAvailable}
                          className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black transition-all relative group/date
                            ${isSelected 
                              ? 'bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110 z-10' 
                              : isHighDemand
                                ? 'bg-blue-50 text-[#3B82F6] border border-blue-200'
                                : isAvailable 
                                  ? 'text-[#1D1D1F] hover:bg-blue-50 hover:text-[#3B82F6]' 
                                  : isFullyBooked
                                    ? 'text-red-300 bg-red-50/30 cursor-not-allowed line-through'
                                    : 'text-gray-200 cursor-not-allowed'}
                            ${isToday ? 'ring-2 ring-inset ring-[#3B82F6]/30' : ''}`}
                        >
                          {date}
                          {isHighDemand && !isSelected && (
                            <div className="absolute top-1 right-1 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
                          )}
                          {isSelected && <div className="absolute inset-0 rounded-xl bg-blue-400/20 animate-ping"></div>}
                        </button>
                      );
                    })}
                 </div>
               </div>

               <div className="w-full lg:w-48 space-y-4">
                 <h4 className="font-black text-sm text-[#1D1D1F] uppercase tracking-wider mb-2 text-center lg:text-left">Khung giờ</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {['09:00', '10:00', '14:00', '15:30', '16:45'].map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 border rounded-xl text-xs font-black transition-all text-center
                          ${selectedTime === time 
                            ? "bg-[#1D4ED8] text-white border-transparent shadow-[0_0_15px_rgba(29,78,216,0.4)] scale-105" 
                            : "border-gray-100 text-[#1D1D1F] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-blue-50"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
               </div>
             </div>
           </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <button 
                 onClick={() => { setCurrentStep(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                 className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
               >
                 Xác nhận lịch hẹn <ArrowRight size={18} />
               </button>
            </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Pass phỏng vấn',
      desc: 'Theo dõi email cá nhân để nhận thông báo chính thức nhé.',
      icon: <Video className="w-6 h-6" />,
      status: currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'locked',
      customContent: (
        <div className="mt-6 text-left">
           <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-3">
              <p className="text-[#1D1D1F] text-sm font-bold leading-relaxed">
                 • <span className="text-blue-600">Nếu Pass:</span> Nhận email vào nhóm và ký bảo mật.<br/>
                 • <span className="text-gray-400 font-medium">Nếu Fail:</span> Nhận email cảm ơn.
              </p>
           </div>
           <button 
              onClick={() => { setCurrentStep(5); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto mt-4"
            >
              Tiến tới bước cuối cùng
            </button>
        </div>
      )
    },
    {
      id: 5,
      title: 'Về nhà thôi!',
      desc: 'Hoàn thiện hồ sơ cuối để chính thức bắt đầu hành trình.',
      icon: <PartyPopper className="w-6 h-6" />,
      status: currentStep === 5 ? 'active' : 'locked',
      customContent: (
        <div className="mt-8 text-left">
           <div className="relative group overflow-hidden bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-8 rounded-[2.5rem] shadow-2xl shadow-purple-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-20"><PartyPopper size={120} /></div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Chốt đơn! Thảo Nhi đã là một mẩu của NhiLe Team! 🥳
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                    Sẵn sàng nhé. Check email nhận 'bí kíp võ công' tham gia cùng anh em mình nha. 🚀
                  </p>
                </div>
                <button 
                  onClick={() => window.open("https://t.me/+your_group_link", "_blank")}
                  className="w-full bg-white text-[#1D4ED8] py-6 px-8 rounded-[2rem] font-black text-xl shadow-lg hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 group/btn"
                >
                  BẮT ĐẦU HÀNH TRÌNH NGAY
                  <Zap className="fill-current group-hover/btn:animate-bounce" size={24} />
                </button>
              </div>
           </div>
        </div>
      )
    }
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-[100dvh] bg-[#F9F9F9] flex flex-col md:flex-row font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.webp" alt="NLT" className="w-8 h-8 object-contain" />
          <span className="font-black text-sm tracking-tight text-blue-600">NhiLe Team</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-0 z-[90] md:relative md:flex md:w-80 bg-white border-r border-gray-100 p-8 flex-col justify-between h-screen transition-transform duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
        <div className="space-y-10">
          <div className="hidden md:flex flex-col items-center justify-center w-full">
            <img src="/logo.webp" alt="NLT" className="w-20 h-20 object-contain hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="space-y-6 pt-16 md:pt-0">
            <div className="flex items-center gap-4 p-5 bg-[#F9F9F9] rounded-[2rem] border border-gray-50">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 border border-gray-100 shrink-0"><User size={24} /></div>
              <div className="min-w-0">
                <h3 className="font-black text-sm text-[#1D1D1F] truncate uppercase">Thảo Nhi Lê</h3>
              </div>
            </div>
            <nav className="space-y-2">
              <div className="flex items-center gap-3 px-6 py-4 text-blue-600 bg-blue-50 rounded-2xl font-black text-sm border border-blue-100 transition-all cursor-default"><CheckCircle2 size={18} /> Onboarding</div>
            </nav>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all text-sm font-black mt-10 group pb-8 md:pb-0"><LogOut size={18} /> Đăng xuất</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 sm:p-8 md:p-12 lg:p-16 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight leading-tight">Chào mừng Thảo Nhi!</h2>
              <p className="text-gray-500 text-sm sm:text-base font-bold max-w-xl leading-relaxed mx-auto sm:mx-0">
                Chúng mình đã chuẩn bị sẵn mọi thứ — hoàn tất vài bước nhỏ để bắt đầu hành trình cùng <span className="text-blue-600">NhiLe Team</span> nha!
              </p>
            </div>
            
            <div className="flex-1 max-w-md w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.15em]">Tiến trình thành viên</span>
                </div>
                <span className="text-xs font-black text-blue-600">{currentStep === 5 ? "100" : Math.round((currentStep / 5) * 100)}%</span>
              </div>
              <div className="h-4 w-full bg-blue-50 rounded-full overflow-hidden p-1 border border-blue-100/50">
                <div 
                  className="h-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-[length:200%_100%] animate-shimmer transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>
          </header>

          <div className="relative space-y-4">
            <div className="absolute left-[31px] sm:left-[35px] top-10 bottom-10 w-0.5 bg-gray-100 z-0" />
            {steps.map((step) => {
              const isActive = step.status === 'active';
              return (
                <div key={step.id} className={`relative z-10 flex gap-5 sm:gap-8 p-6 sm:p-8 rounded-[2.5rem] transition-all duration-500 ${isActive ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50' : 'bg-transparent'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 
                    ${step.status === 'completed' 
                      ? 'bg-[#10B981] text-white' 
                      : isActive 
                        ? step.id === 5
                          ? 'bg-gradient-to-br from-[#FB923C] to-[#F59E0B] text-white ring-8 ring-orange-500/10 animate-bounce-subtle' 
                          : 'bg-[#3B82F6] text-white ring-8 ring-blue-600/5 shadow-lg shadow-blue-500/20' 
                        : 'bg-white text-gray-200 border border-gray-100'}`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                  </div>
                  <div className={`flex-1 space-y-1.5 pt-1 text-left transition-opacity duration-500 ${step.status === 'locked' ? 'opacity-30' : 'opacity-100'}`}>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step.status === 'completed' ? 'text-[#10B981]' : isActive ? 'text-blue-600' : 'text-gray-400'}`}>Bước {step.id}</span>
                    <h3 className={`text-lg font-black tracking-tight ${step.status === 'locked' ? 'text-gray-300' : 'text-[#1D1D1F]'}`}>{step.title}</h3>
                    <p className={`text-xs sm:text-sm font-bold leading-relaxed ${step.status === 'completed' ? 'text-gray-400' : 'text-gray-500'}`}>{step.desc}</p>
                    {isActive && step.customContent}
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </main>

      {/* Quiz Modal Popup */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsQuizModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {!showQuizResult ? (
              <div className="p-8 sm:p-12 space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg">
                    {activeQuizType === "skill" ? "Test Năng Lực" : "Test Văn Hóa"}
                  </span>
                  <span className="text-xs font-black text-gray-400">Câu {currentQuestionIndex + 1}/{currentQuestions.length}</span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] leading-tight text-left">
                    {currentQuestions[currentQuestionIndex].q}
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentQuestions[currentQuestionIndex].a.map((ans, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const newAnswers = [...quizAnswers, idx];
                        setQuizAnswers(newAnswers);
                        if (currentQuestionIndex < currentQuestions.length - 1) {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                        } else {
                          handleQuizSubmit();
                        }
                      }}
                      className="w-full text-left p-5 border border-gray-100 rounded-2xl font-bold text-sm text-[#1D1D1F] hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-[0.98]"
                    >
                      {ans}
                    </button>
                  ))}
                </div>

                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-12 text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                  <CheckCircle2 className="text-white w-10 h-10" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-black text-[#1D1D1F]">Tuyệt vời!</h3>
                  <p className="text-gray-500 font-medium lowercase">Bạn đã hoàn thành bài test và đủ điều kiện sang bước tiếp theo.</p>
                </div>
                <div className="pt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`
        .overflow-y-auto::-webkit-scrollbar { display: none; }
        .overflow-y-auto { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
