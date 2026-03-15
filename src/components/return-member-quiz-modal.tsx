import { useState } from "react";
import { X, ArrowRight, RotateCcw } from "lucide-react";

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

const PASS_SCORE = 110;
const MAX_ESSAY = 30;

// ─── Scoring ──────────────────────────────────────────────────────────────────

function calcEssayScore(answers: string[]): number {
  const combined = answers.join(" ").toLowerCase();
  const goodHits = GOOD_KEYWORDS.filter(kw => combined.includes(kw)).length;
  const badHits = BAD_KEYWORDS.filter(kw => combined.includes(kw)).length;
  const raw = goodHits * 5 - badHits * 5;
  return Math.max(0, Math.min(MAX_ESSAY, raw));
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { onPass: () => void; onFail: () => void; onClose: () => void; }

type Phase = "mc" | "essay" | "result";

export default function ReturnMemberQuizModal({ onPass, onFail, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("mc");
  const [mcIndex, setMcIndex] = useState(0);
  const [mcAnswers, setMcAnswers] = useState<number[]>([]);
  const [essayAnswers, setEssayAnswers] = useState<string[]>(Array(6).fill(""));
  const [result, setResult] = useState<{ mc: number; essay: number; total: number; passed: boolean } | null>(null);

  const handleMcAnswer = (idx: number) => {
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
    const passed = total >= PASS_SCORE;
    setResult({ mc, essay, total, passed });
    setPhase("result");
  };

  const progress = phase === "mc" ? Math.round(((mcIndex) / MC_QUESTIONS.length) * 100) : 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-black text-[#1D1D1F]">
              {phase === "mc" ? `Câu ${mcIndex + 1} / ${MC_QUESTIONS.length}` : phase === "essay" ? "Phần tự luận" : "Kết quả"}
            </h2>
            {phase === "mc" && (
              <div className="mt-2 h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-7 py-5">

          {/* MC Phase */}
          {phase === "mc" && (
            <div className="space-y-5">
              <p className="font-black text-[#1D1D1F] text-base leading-snug">{MC_QUESTIONS[mcIndex].q}</p>
              <div className="space-y-2">
                {MC_QUESTIONS[mcIndex].opts.map((opt, i) => (
                  <button key={i} onClick={() => handleMcAnswer(i)}
                    className="w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-black text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm font-medium text-gray-700 pt-0.5">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Essay Phase */}
          {phase === "essay" && (
            <div className="space-y-5">
              <p className="text-sm text-gray-500 font-medium">Trả lời 6 câu hỏi sau. Câu trả lời của bạn sẽ được phân tích tự động.</p>
              {ESSAY_QUESTIONS.map((q, i) => (
                <div key={i}>
                  <label className="block text-xs font-black text-gray-500 mb-2">{i + 1}. {q}</label>
                  <textarea
                    rows={3}
                    value={essayAnswers[i]}
                    onChange={e => { const a = [...essayAnswers]; a[i] = e.target.value; setEssayAnswers(a); }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    placeholder="Nhập câu trả lời của bạn..."
                  />
                </div>
              ))}
            </div>
          )}

          {/* Result Phase */}
          {phase === "result" && result && (
            <div className="space-y-5 py-2">
              <div className={`rounded-2xl p-6 ${result.passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`text-2xl font-black ${result.passed ? "text-green-700" : "text-red-600"}`}>
                  {result.passed ? "Chúc mừng! Bạn đã đạt 🎉" : "Chưa đạt yêu cầu"}
                </p>
                <p className={`text-sm font-medium mt-1 ${result.passed ? "text-green-600" : "text-red-500"}`}>
                  Tổng điểm: {result.total} / 130 (yêu cầu: {PASS_SCORE})
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Trắc nghiệm</p>
                  <p className="text-2xl font-black text-[#1D1D1F] mt-1">{result.mc} <span className="text-sm text-gray-400">/ 100</span></p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Tự luận</p>
                  <p className="text-2xl font-black text-[#1D1D1F] mt-1">{result.essay} <span className="text-sm text-gray-400">/ 30</span></p>
                </div>
              </div>
              {!result.passed && (
                <p className="text-sm text-gray-500 font-medium leading-relaxed bg-gray-50 rounded-2xl p-4">
                  Cảm ơn bạn đã dành thời gian làm bài test và quan tâm quay lại với NhiLe Team. Sau khi kiểm tra kết quả, chỉ số hiện tại chưa phù hợp với yêu cầu để tham gia vòng phỏng vấn, vì vậy team chưa thể sắp xếp buổi phỏng vấn cho bạn trong thời điểm này.<br /><br />
                  Team ghi nhận tinh thần chủ động và cách bạn hoàn thành bài làm. Đây là những điểm tích cực trong quá trình bạn tham gia.<br /><br />
                  Bạn có thể đăng ký làm lại bài test sau 03 tháng, khi đã có thêm thời gian nhìn lại, học hỏi và bổ sung những kỹ năng cần thiết. Khi đến thời điểm phù hợp, team luôn sẵn sàng tiếp nhận lại hồ sơ của bạn theo đúng quy trình.<br /><br />
                  Chúc bạn có thêm nhiều trải nghiệm tích cực và hành trình phía trước diễn ra thuận lợi.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === "essay" && (
          <div className="px-7 py-5 border-t border-gray-100 shrink-0">
            <button onClick={handleSubmitEssay}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-2xl font-black text-sm transition-colors flex items-center justify-center gap-2">
              Nộp bài <ArrowRight size={16} />
            </button>
          </div>
        )}
        {phase === "result" && result && (
          <div className="px-7 py-5 border-t border-gray-100 shrink-0">
            {result.passed ? (
              <button onClick={() => { onPass(); onClose(); }}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-2xl font-black text-sm transition-colors">
                Tiếp tục hành trình →
              </button>
            ) : (
              <button onClick={() => { onFail(); onClose(); }}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3.5 rounded-2xl font-black text-sm transition-colors">
                <RotateCcw size={15} /> Đóng
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
