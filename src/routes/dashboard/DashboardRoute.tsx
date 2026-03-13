import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
  User,
  Calendar,
  Video,
  FileText,
  LogOut,
  ArrowRight,
  Clock
} from 'lucide-react';

// Theme Colors
const COLORS = {
  background: '#F9F9F9',
  oak: '#8B5E3C', // Oak Wood
  oakLight: '#A67C52',
  charcoal: '#1D1D1F',
  appleGreen: '#34C759',
  glass: 'rgba(255, 255, 255, 0.7)'
};

interface Step {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'locked' | 'skipped';
}

interface DashboardProps {
  userType?: string;
  onLogout?: () => void;
}

const DashboardRoute: React.FC<DashboardProps> = ({ userType = 'new', onLogout }) => {
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (Endowed Progress)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Sơ loại',
      desc: 'Hệ thống đã xác nhận hồ sơ của bạn.',
      icon: <CheckCircle2 className="w-6 h-6" />,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Đăng ký & Lịch hẹn',
      desc: 'Chọn thời gian để chúng ta làm quen nhé.',
      icon: <Calendar className="w-6 h-6" />,
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'locked'
    },
    {
      id: 3,
      title: 'Phỏng vấn',
      desc: 'Kết quả sẽ được cập nhật sau buổi gặp.',
      icon: <Video className="w-6 h-6" />,
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'locked'
    },
    {
      id: 4,
      title: 'Ký bảo mật NDA',
      desc: 'Bảo vệ giá trị chung của cộng đồng.',
      icon: <FileText className="w-6 h-6" />,
      status: userType === 'returning' ? 'skipped' : (currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'locked')
    },
    {
      id: 5,
      title: 'Gia nhập hệ thống',
      desc: 'Chào mừng bạn chính thức về nhà!',
      icon: <ArrowRight className="w-6 h-6" />,
      status: currentStep === 5 ? 'active' : 'locked'
    }
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F9F9F9] flex flex-col md:flex-row font-sans"
    >
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-gray-100 p-8 flex flex-col justify-between">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5E3C] flex items-center justify-center text-white font-bold">NL</div>
            <span className="font-semibold text-lg">NhiLe Dashboard</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500"><User size={24} /></div>
              </div>
              <div>
                <h3 className="font-medium text-sm">Tình nguyện viên</h3>
              </div>
            </div>

            <nav className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-3 text-[#8B5E3C] bg-[#8B5E3C]/5 rounded-xl font-medium">
                <CheckCircle2 size={20} /> Onboarding
              </div>
              <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors cursor-not-allowed">
                <Lock size={20} /> Tài liệu nội bộ
              </div>
            </nav>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium mt-10"
        >
          <LogOut size={18} /> Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[#1D1D1F]">Lộ trình của bạn</h2>
              <p className="text-gray-500">Bạn đang hoàn thành rất tốt, chỉ còn vài bước nữa thôi!</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium flex items-center gap-2 text-[#8B5E3C]">
              <Clock size={16} /> Hoàn thành 20%
            </div>
          </header>

          {/* Progress Track */}
          <div className="relative space-y-6">
            {/* Connection Line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gray-200 z-0 hidden md:block" />

            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isSkipped = step.status === 'skipped';

              if (isSkipped) return null;

              return (
                <div
                  key={step.id}
                  className={`relative z-10 flex gap-6 p-6 rounded-3xl transition-all duration-500 border
                    ${step.status === 'active' ? 'bg-white shadow-xl border-gray-100 scale-[1.02]' : 'bg-transparent border-transparent opacity-80'}`}
                >
                  {/* Icon Node */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm
                    ${step.status === 'completed' ? 'bg-[#34C759] text-white' :
                      step.status === 'active' ? 'bg-[#8B5E3C] text-white ring-8 ring-[#8B5E3C]/10' :
                      'bg-white text-gray-300 border border-gray-200'}`}
                  >
                    {step.status === 'completed' ? <CheckCircle2 /> : step.icon}
                  </div>

                  <div className="flex-1 space-y-1 pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-wider
                        ${step.status === 'completed' ? 'text-[#34C759]' :
                          step.status === 'active' ? 'text-[#8B5E3C]' : 'text-gray-400'}`}>
                        Bước {step.id} {step.status === 'completed' && '— Đã xong'}
                      </span>
                    </div>
                    <h3 className={`text-xl font-semibold ${step.status === 'locked' ? 'text-gray-400' : 'text-[#1D1D1F]'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 font-light max-w-lg">{step.desc}</p>

                    {step.status === 'active' && (
                      <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                        {step.id === 2 ? (
                          <button
                            onClick={() => setCurrentStep(3)}
                            className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                          >
                            Đặt lịch ngay <ChevronRight size={18} />
                          </button>
                        ) : step.id === 3 ? (
                          <div className="text-[#8B5E3C] bg-[#8B5E3C]/10 px-6 py-3 rounded-xl flex items-center gap-2">
                            <Clock size={18} /> Team đang xử lý hồ sơ...
                          </div>
                        ) : (
                          <button className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                            Tiếp tục
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* End-Endowed Hint */}

        </div>
      </main>

      <style>{`
        body {
          background-color: #F9F9F9;
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DashboardRoute;