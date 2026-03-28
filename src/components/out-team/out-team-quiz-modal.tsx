import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft } from "lucide-react";
import { CULTURE_QUESTIONS, TIMER_SECONDS, PASS_SCORE } from "../../data/culture-questions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPass: () => void;
  onProgress?: (count: number) => void;
}

const OutTeamQuizModal = ({ isOpen, onClose, onPass, onProgress }: Props) => {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // only for last question
  const [timer, setTimer]                   = useState(TIMER_SECONDS);
  const [showResult, setShowResult]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [passed, setPassed]                 = useState(false);
  const timerRef                            = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalQuestions  = CULTURE_QUESTIONS.length;
  const timerPercent    = (timer / TIMER_SECONDS) * 100;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isLast          = currentIndex === totalQuestions - 1;
  const currentQ        = CULTURE_QUESTIONS[currentIndex];

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0); setAnswers([]); setSelectedAnswer(null);
      setTimer(TIMER_SECONDS); setShowResult(false); setScore(0); setPassed(false);
    }
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || showResult) return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAnswer(-1); // auto-advance as wrong
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [isOpen, currentIndex, showResult]);

  const handleAnswer = (idx: number) => {
    clearInterval(timerRef.current!);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    onProgress?.(newAnswers.length);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimer(TIMER_SECONDS);
      setSelectedAnswer(null);
    } else {
      const finalScore = newAnswers.filter((a, i) => a === CULTURE_QUESTIONS[i].correct).length;
      setScore(finalScore);
      const hasPassed = finalScore >= PASS_SCORE;
      setPassed(hasPassed);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    clearInterval(timerRef.current!);
    setCurrentIndex(prev => prev - 1);
    setAnswers(prev => prev.slice(0, -1));
    setSelectedAnswer(null);
    setTimer(TIMER_SECONDS);
  };

  const handleClose = () => { clearInterval(timerRef.current!); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm overlay-in" onClick={handleClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden modal-pop max-h-[90vh] flex flex-col">

        {!showResult ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TEST VĂN HOÁ</span>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
            </div>

            {/* Timer + question counter */}
            <div className="px-6 pt-4 shrink-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-gray-700">CÂU {currentIndex + 1} / {totalQuestions}</span>
                <span className={`text-sm font-black flex items-center gap-1.5 ${timer <= 10 ? "text-red-500" : "text-orange-500"}`}>
                  ⏱ 0:{String(timer % 60).padStart(2, "0")}s
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${timer <= 10 ? "bg-red-500" : "bg-orange-400"}`} style={{ width: `${timerPercent}%` }} />
              </div>
            </div>

            {/* Question */}
            <div className="px-6 py-4 shrink-0">
              <h3 className="text-base md:text-lg font-black text-gray-900 leading-snug">{currentQ.q}</h3>
            </div>

            {/* Options */}
            <div className="px-6 space-y-2 overflow-y-auto flex-1">
              {currentQ.a.map((opt, idx) => (
                <button key={idx}
                  onClick={() => isLast ? setSelectedAnswer(idx) : handleAnswer(idx)}
                  className={`w-full flex items-center gap-3 p-3.5 border-2 rounded-2xl text-sm text-left transition-all active:scale-[0.98]
                    ${isLast && selectedAnswer === idx
                      ? "border-purple-500 bg-purple-50 text-purple-900"
                      : "border-gray-100 text-gray-700 hover:border-purple-400 hover:bg-purple-50"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isLast && selectedAnswer === idx ? "border-purple-600" : "border-gray-300"}`}>
                    {isLast && selectedAnswer === idx && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                  </div>
                  <span className="font-medium">{opt}</span>
                </button>
              ))}
            </div>

            {/* Bottom: back + progress + nộp bài */}
            <div className="px-6 pb-5 pt-3 shrink-0 space-y-3">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex items-center justify-between gap-3">
                {currentIndex > 0 ? (
                  <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 font-bold transition-colors shrink-0">
                    <ChevronLeft size={16} /> Quay lại
                  </button>
                ) : <div />}
                {isLast && (
                  <button disabled={selectedAnswer === null}
                    onClick={() => { if (selectedAnswer !== null) { handleAnswer(selectedAnswer); setSelectedAnswer(null); } }}
                    className={`px-8 py-2.5 rounded-2xl font-black text-sm transition-all ${selectedAnswer !== null ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-95" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                    Nộp bài
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Result screen */
          <div className="p-8 md:p-10 text-center space-y-5 overflow-y-auto">
            {passed ? (
              <>
                <div className="text-5xl icon-float">🤩</div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-gray-900">Xuất sắc luôn!</h3>
                  <p className="text-gray-500 text-sm font-medium">Dữ vậy ta, làm lần đầu mà đúng luôn kìa, giỏi thiệt á chứ.</p>
                </div>
                <button onClick={() => { handleClose(); onPass(); }} className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-sm shadow-lg hover:bg-green-600 active:scale-95 transition-all">
                  Tiếp tục hành trình
                </button>
              </>
            ) : (
              <>
                <div className="text-5xl icon-shake">😭</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Chưa đạt rồi!</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Đời mà ai không té, té thì đứng lên thôi. Ngại gì mà không làm lại, mình đọc tài liệu lại rồi chiến lại thôi nè.
                  </p>
                </div>
                <p className="text-gray-400 text-xs font-medium">Kết quả: {score}/{totalQuestions} — Không thể làm lại.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutTeamQuizModal;
