import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, Clock } from "lucide-react";

const VerifyCCCD = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-focus first input on load
    const firstInput = document.getElementById('cccd-0');
    firstInput?.focus();
    
    // Countdown timer for 1 minute
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // Exit after 1 minute
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setIsError(false);

    // Haptic feedback on each digit entry for GenZ experience
    if (value && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`cccd-${index + 1}`);
      nextInput?.focus();
    }

    // Focus verification button if all digits are filled
    if (value && index === 4 && newCode.every(d => d !== "")) {
      setTimeout(() => {
        const verifyBtn = document.getElementById('verify-button');
        verifyBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 5).replace(/\D/g, '');
    if (pasteData.length === 0) return;

    const newCode = [...code];
    pasteData.split('').forEach((char, i) => {
      if (i < 5) newCode[i] = char;
    });
    setCode(newCode);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasteData.length, 4);
    document.getElementById(`cccd-${focusIndex}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`cccd-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 5) {
      setIsVerifying(true);
      // Haptic feedback for tactile response
      if (window.navigator.vibrate) window.navigator.vibrate(50);
      
      // Mock verification delay
      setTimeout(() => {
        navigate("/select-role");
      }, 800);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={`min-h-[100dvh] bg-[#F9F9F9] flex items-center justify-center p-6 font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 p-8 sm:p-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Header Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto animate-pulse">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-50">
            <Lock size={14} className="text-blue-600" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3">

          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Xác minh bảo mật</h1>
          <p className="text-gray-500 font-bold text-sm leading-relaxed">
            Vui lòng nhập <span className="text-[#3B82F6] font-[900]">5 số cuối CCCD</span> của bạn thôi nhé.
          </p>
        </div>

        {/* OTP-style Inputs */}
        <div className="flex justify-center gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`cccd-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-16 sm:w-14 sm:h-20 bg-[#F9F9F9] border-2 rounded-2xl text-center text-2xl font-black transition-all outline-none
                ${isError ? 'border-red-200 text-red-500 animate-shake' : 
                  digit ? 'border-[#7C3AED] text-[#7C3AED] bg-white shadow-lg shadow-[#7C3AED]/10' : 'border-gray-100 text-[#1D1D1F] focus:border-[#7C3AED] focus:bg-white'}`}
            />
          ))}
        </div>

        {isError && (
          <p className="text-red-500 text-xs font-black animate-in fade-in slide-in-from-top-1">
            Vui lòng điền đầy đủ cả 5 chữ số nha!
          </p>
        )}

        {/* CTA Button */}
        <button
          id="verify-button"
          onClick={handleVerify}
          disabled={code.some(d => d === "") || isVerifying}
          className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]
            ${code.every(d => d !== "") 
              ? 'bg-[#10B981] text-white shadow-[#10B981]/20 hover:bg-[#059669] hover:shadow-2xl' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
        >
          {isVerifying ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Xác nhận danh tính
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Help Footer */}
        <div className="pt-4 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2 text-[#F87171] font-black uppercase tracking-widest text-sm animate-pulse">
            <Clock size={16} />
            <span>Thời gian còn lại: 00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default VerifyCCCD;
