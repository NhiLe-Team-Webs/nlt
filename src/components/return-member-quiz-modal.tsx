import { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MC_QUESTIONS = [
  { q: "Bạn nhận một việc, làm được khoảng 80%, nhưng còn một chi tiết nhỏ chưa chắc đúng. Bạn:", opts: ["Hỏi lại cho chắc dù có thể chậm hơn", "Làm theo cách mình nghĩ, xử lý nộp deadline trước", "Để đó, chờ người khác nói", "Bỏ qua vì nghĩ không quan trọng"] },
  { q: "Deadline là tối nay, nhưng bạn thấy mình cần thêm thời gian để làm tốt hơn. Bạn:", opts: ["Báo sớm để xin dời hoặc giảm phạm vi", "Cố làm hết dù chất lượng chưa như ý", "Làm xong phần chính, bỏ chi tiết", "Nộp trễ mà không báo"] },
  { q: "Bạn thấy cách làm hiện tại của nhóm chưa hợp lý, nhưng mọi người đã quen như vậy. Bạn:", opts: ["Nói ra ý kiến của bản thân với mọi người", "Giữ ý kiến cho riêng mình, chờ thời điểm thích hợp rồi nói", "Làm theo dù không đồng ý", "Làm khác cách chung"] },
  { q: "Một việc bạn làm bị góp ý là chưa đúng, nhưng bạn thấy mình có lý. Bạn:", opts: ["Nghe lại và điều chỉnh nếu cần", "Giải thích quan điểm của mình", "Giữ cách làm cũ", "Khó chịu và né tránh"] },
  { q: "Bạn đang bận việc cá nhân, nhưng vẫn có một phần việc nhỏ trong team. Bạn:", opts: ["Báo rõ tình trạng của mình cho team", "Xử lý phần đó khi mình rảnh, rồi gửi sau", "Im lặng vài ngày", "Không phản hồi"] },
  { q: "Trong một buổi họp, nội dung có phần không liên quan trực tiếp đến bạn. Bạn:", opts: ["Vẫn nghe để nắm chung, ghi chú lại", "Nghe nhưng không cần ghi chú", "Làm việc riêng", "Thoát họp"] },
  { q: "Bạn hoàn thành việc sớm hơn dự kiến. Bạn:", opts: ["Kiểm tra lại trước khi gửi", "Gửi ngay khi hoàn thành xong", "Đợi đến gần deadline rồi gửi", "Quên gửi"] },
  { q: "Một người trong team làm chậm, ảnh hưởng tới phần việc của bạn. Bạn:", opts: ["Trao đổi trực tiếp để cùng chỉnh", "Báo lại để được hướng dẫn xử lý", "Tự làm phần mình rồi thôi", "Khó chịu nhưng không nói"] },
  { q: "Bạn không đồng ý với quyết định chung, nhưng việc đã chốt. Bạn:", opts: ["Làm theo và ghi nhận để góp ý sau", "Làm theo nhưng không vui", "Xin đổi lại vị trí", "Làm qua loa"] },
  { q: "Bạn thấy một lỗi nhỏ trong việc của người khác. Bạn:", opts: ["Nhắc riêng để họ biết", "Để người có trách nhiệm xử lý", "Bỏ qua vì không phải việc mình", "Nói với người khác"] },
  { q: "Bạn được giao một việc quen thuộc, khá đơn giản. Bạn:", opts: ["Vẫn làm như bình thường", "Làm nhanh cho xong", "Xin đổi công việc khác", "Trì hoãn"] },
  { q: "Khi có thay đổi trong cách làm, bạn:", opts: ["Cập nhật và làm theo", "Cần thời gian để quen", "Chỉ làm khi bị nhắc", "Không thay đổi"] },
  { q: "Một tin nhắn trong nhóm liên quan đến công việc của bạn, nhưng không gấp. Bạn:", opts: ["Trả lời khi thấy", "Trả lời khi rảnh", "Để đó", "Không trả lời"] },
  { q: "Bạn làm sai một việc nhỏ nhưng chưa ai phát hiện. Bạn:", opts: ["Chủ động nói ra", "Sửa lại âm thầm", "Để đó nếu chưa ảnh hưởng", "Giấu luôn"] },
  { q: "Khi làm việc chung online, bạn:", opts: ["Theo đúng cách nhóm thống nhất", "Điều chỉnh cho tiện bản thân", "Làm theo thói quen cũ", "Không để ý"] },
  { q: "Bạn thấy mình đang làm chậm hơn người khác. Bạn:", opts: ["Tìm cách cải thiện nhịp làm việc", "Làm trong khả năng của mình", "Thông báo leader tình hình của mình", "Dễ nản"] },
  { q: "Một việc bạn làm xong nhưng kết quả chưa thật sự tốt. Bạn:", opts: ["Chỉnh lại trước khi gửi", "Gửi và chờ phản hồi", "Gửi cho xong", "Không gửi"] },
  { q: "Khi có quy định chung mới, bạn:", opts: ["Đọc và làm theo", "Làm theo khi được nhắc", "Thỉnh thoảng quên", "Không để ý"] },
  { q: "Sau khi hoàn thành việc nhóm, bạn:", opts: ["Kiểm tra xem có ảnh hưởng ai không", "Xong là thôi", "Không quan tâm nhiều", "Mặc kệ"] },
  { q: "Khi bạn nhận được phản hồi chung cho cả nhóm, trong đó có phần bạn chưa đồng ý, bạn thường:", opts: ["Chọn lọc phần phù hợp để điều chỉnh cách làm của mình", "Ghi nhận nhưng giữ cách làm hiện tại", "Bỏ qua vì không nhắm trực tiếp tới mình", "Khó chịu và không muốn đọc kỹ"] },
];

const MC_SCORES = [5, 4, 2, 1];
const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 30;

const ESSAY_QUESTIONS = [
  "Trong thời gian rời team, bạn học được hoặc nhận ra điều gì về chính mình và về team?",
  "Điều gì thôi thúc bạn muốn quay lại lần này, thay vì chọn một nhóm/tổ chức khác?",
  'Giá trị "Tâm – Tầm – Đức" của NhiLe có ý nghĩa thế nào đối với bạn? Bạn đã hành động giá trị đó như thế nào?',
  "Trong 1 tháng đầu tiên sau khi quay lại, bạn chủ động làm gì để chứng minh mình thật sự nghiêm túc với cơ hội này?",
  "Nếu được quay lại, bạn muốn đóng góp điều gì để giúp team phát triển bền vững, chứ không chỉ dừng lại ở việc hoàn thành công việc cá nhân?",
  "Nếu lần này team chưa thể đáp ứng điều bạn mong muốn, bạn có sẵn sàng tiếp tục đồng hành vì sứ mệnh chung không? Tại sao?",
];

const GOOD_KEYWORDS = ["giúp", "hỗ trợ", "sẻ chia", "cộng đồng", "lan tỏa", "đóng góp", "thương", "gắn bó", "học hỏi", "phát triển", "trau dồi", "kỹ năng", "lâu dài", "mục tiêu", "trách nhiệm", "chủ động", "cam kết", "sửa sai", "rút kinh nghiệm", "kỷ luật", "trung thực", "môi trường"];
const BAD_KEYWORDS = ["rảnh", "thử sức", "cho biết", "tạm thời", "xem sao", "không chắc", "không hợp", "quá bận", "chán", "cố gắng", "cho vui", "xem thử", "do hoàn cảnh", "không ai hướng dẫn", "áp lực", "mất niềm tin"];

const PASS_TOTAL = 110;
const MAX_ESSAY = 30;

function calcEssayScore(answers: string[]): number {
  const combined = answers.join(" ").toLowerCase();
  const good = GOOD_KEYWORDS.filter(kw => combined.includes(kw)).length;
  const bad = BAD_KEYWORDS.filter(kw => combined.includes(kw)).length;
  return Math.max(0, Math.min(MAX_ESSAY, good * 5 - bad * 5));
}

// ─── LocalStorage ─────────────────────────────────────────────────────────────

const LS = {
  PHASE: "nlt_rtq_phase",
  MC_IDX: "nlt_rtq_mc_idx",
  MC_ANS: "nlt_rtq_mc_ans",
  ESSAY_ANS: "nlt_rtq_essay_ans",
  RESULT: "nlt_rtq_result",
} as const;

const clearQuizStorage = () => Object.values(LS).forEach(k => localStorage.removeItem(k));

// ─── Component ────────────────────────────────────────────────────────────────

type Phase = "mc" | "essay" | "result";

interface Props { isOpen: boolean; onPass: () => void; onFail: () => void; onClose: () => void; }

export default function ReturnMemberQuizModal({ isOpen, onPass, onFail, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>(() => (localStorage.getItem(LS.PHASE) as Phase) || "mc");
  const [mcIndex, setMcIndex] = useState(() => parseInt(localStorage.getItem(LS.MC_IDX) || "0"));
  const [mcAnswers, setMcAnswers] = useState<number[]>(() => { try { return JSON.parse(localStorage.getItem(LS.MC_ANS) || "[]"); } catch { return []; } });
  const [essayAnswers, setEssayAnswers] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem(LS.ESSAY_ANS) || "null") || Array(6).fill(""); } catch { return Array(6).fill(""); } });
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [result, setResult] = useState<{ mc: number; essay: number; total: number; passed: boolean } | null>(() => { try { return JSON.parse(localStorage.getItem(LS.RESULT) || "null"); } catch { return null; } });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Save state to localStorage
  useEffect(() => { localStorage.setItem(LS.PHASE, phase); }, [phase]);
  useEffect(() => { localStorage.setItem(LS.MC_IDX, mcIndex.toString()); }, [mcIndex]);
  useEffect(() => { localStorage.setItem(LS.MC_ANS, JSON.stringify(mcAnswers)); }, [mcAnswers]);
  useEffect(() => { localStorage.setItem(LS.ESSAY_ANS, JSON.stringify(essayAnswers)); }, [essayAnswers]);
  useEffect(() => { if (result) localStorage.setItem(LS.RESULT, JSON.stringify(result)); }, [result]);

  useEffect(() => {
    if (phase !== "mc") return;
    setTimer(TIMER_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { handleMcAnswer(3); return TIMER_SECONDS; } // auto-pick D on timeout
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mcIndex, phase]);

  const handleMcAnswer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const next = [...mcAnswers, idx];
    setMcAnswers(next);
    if (mcIndex < MC_QUESTIONS.length - 1) {
      setMcIndex(mcIndex + 1);
    } else {
      setPhase("essay");
    }
  };

  const handleSubmitEssay = () => {
    const mc = mcAnswers.reduce((sum, a) => sum + MC_SCORES[a], 0);
    const essay = calcEssayScore(essayAnswers);
    const total = mc + essay;
    setResult({ mc, essay, total, passed: total >= PASS_TOTAL });
    setPhase("result");
  };

  const timerPercent = (timer / TIMER_SECONDS) * 100;
  const mcProgress = Math.round(((mcIndex + 1) / MC_QUESTIONS.length) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">

        {/* ── MC Phase ──────────────────────────────────────────────────── */}
        {phase === "mc" && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-7 sm:p-8 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white/70 uppercase tracking-widest">Test Quay Trở Lại</span>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">{MC_QUESTIONS[mcIndex].q}</h3>
            </div>

            {/* Timer */}
            <div className="px-7 sm:px-8 pt-4 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Thời gian</span>
                <span className={`text-xs font-black tabular-nums ${timer <= 10 ? "text-red-500" : "text-orange-500"}`}>
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${timer <= 10 ? "bg-red-500" : "bg-gradient-to-r from-orange-400 to-yellow-400"}`} style={{ width: `${timerPercent}%` }} />
              </div>
            </div>

            {/* Options */}
            <div className="px-7 sm:px-8 py-4 space-y-2 overflow-y-auto flex-1">
              {MC_QUESTIONS[mcIndex].opts.map((opt, idx) => (
                <button key={idx} onClick={() => handleMcAnswer(idx)}
                  className="w-full flex items-center gap-3 p-3.5 border-2 border-gray-100 rounded-2xl font-bold text-sm text-[#1D1D1F] hover:border-[#6366F1] hover:bg-indigo-50 hover:text-[#6366F1] transition-all active:scale-[0.98] text-left">
                  <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 shrink-0">
                    {OPTION_LABELS[idx]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="px-7 sm:px-8 pb-6 shrink-0 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-wider">
                <span>Tiến trình</span>
                <span>{mcIndex + 1}/{MC_QUESTIONS.length} câu — {mcProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366F1] transition-all duration-500 rounded-full" style={{ width: `${mcProgress}%` }} />
              </div>
            </div>
          </>
        )}

        {/* ── Essay Phase ───────────────────────────────────────────────── */}
        {phase === "essay" && (
          <>
            <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-7 sm:p-8 space-y-1 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white/70 uppercase tracking-widest">Phần Tự Luận</span>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <p className="text-sm text-white/80 font-medium">Trả lời 6 câu hỏi bên dưới — kết quả sẽ được phân tích tự động.</p>
            </div>

            <div className="overflow-y-auto flex-1 px-7 py-5 space-y-4">
              {ESSAY_QUESTIONS.map((q, i) => (
                <div key={i}>
                  <label className="block text-xs font-black text-gray-500 mb-1.5">{i + 1}. {q}</label>
                  <textarea rows={3} value={essayAnswers[i]}
                    onChange={e => { const a = [...essayAnswers]; a[i] = e.target.value; setEssayAnswers(a); }}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    placeholder="Nhập câu trả lời của bạn..."
                  />
                </div>
              ))}
            </div>

            <div className="px-7 pb-6 pt-2 shrink-0">
              <button onClick={handleSubmitEssay}
                className="w-full flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                Nộp bài <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* ── Result Phase ──────────────────────────────────────────────── */}
        {phase === "result" && result && (
          <div className="p-10 sm:p-12 text-center space-y-6 overflow-y-auto">
            {result.passed ? (
              <>
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                  <CheckCircle2 className="text-white w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#1D1D1F]">Tuyệt vời! 🎉</h3>
                  <p className="text-gray-500 font-bold">
                    Tổng điểm: <span className="text-green-600 font-black">{result.total}/130</span> — Đủ điều kiện vào phỏng vấn!
                  </p>
                  <p className="text-xs text-gray-400">Trắc nghiệm: {result.mc}/100 · Tự luận: {result.essay}/30</p>
                </div>
                <div className="flex justify-center gap-2">
                  {["-0.3s", "-0.15s", "0s"].map(d => <div key={d} className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: d }} />)}
                </div>
                <button onClick={() => { clearQuizStorage(); onPass(); onClose(); }}
                  className="flex items-center gap-2 mx-auto bg-[#6366F1] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95 transition-all">
                  Tiếp tục <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="text-red-500 w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#1D1D1F]">Chưa đạt!</h3>
                  <p className="text-gray-500 font-bold">
                    Tổng điểm: <span className="text-red-500 font-black">{result.total}/130</span> — Cần ít nhất <span className="font-black text-[#1D1D1F]">{PASS_TOTAL}/130</span> để qua.
                  </p>
                  <p className="text-xs text-gray-400">Trắc nghiệm: {result.mc}/100 · Tự luận: {result.essay}/30</p>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Đừng nản nhé! Bạn có thể làm lại ngay bây giờ. Xem lại các câu hỏi và cố gắng lần này nhé!
                </p>
                <button onClick={() => {
                  clearQuizStorage();
                  setPhase("mc");
                  setMcIndex(0);
                  setMcAnswers([]);
                  setEssayAnswers(Array(6).fill(""));
                  setResult(null);
                  setTimer(TIMER_SECONDS);
                }}
                  className="w-full flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                  Làm lại ngay <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
