import { useState, useRef, useEffect } from "react";
import { X, MessageCircle, Send } from "lucide-react";

type ChatMessage = { from: "user" | "bot"; text: string; buttons?: { label: string; action: string }[] };

const BOT_RESPONSES: Record<string, string> = {
  check_result: "Bạn ơi, tất cả thông tin quan trọng (Kết quả, lịch phỏng vấn) đều được gửi qua Gmail bạn đã đăng ký.\n\nTip: Check cả mục Spam nếu chưa thấy nhé!\n\nNếu sau 12-24h vẫn chưa nhận được, hãy nhắn tin tại đây để hệ thống kết nối bạn với Admin hỗ trợ ngay.",
  reschedule: "Team hiểu là đôi khi có những việc đột xuất:\n\nMuốn đổi/Quên lịch: Vui lòng chờ trong ít phút, hệ thống đang kết nối bạn với Admin để sắp xếp lại nhé.\n\nLưu ý múi giờ: Mọi lịch hẹn đều tính theo giờ Việt Nam (GMT+7), bạn nhớ lưu ý để không bị lỡ hẹn nha!",
  procedure: "Quy trình rời team gồm 5 bước: Làm bài test văn hóa → Đặt lịch phỏng vấn → Chờ kết quả → Hoàn thành thủ tục → Chờ Admin xác nhận.\n\nBạn cần hoàn thành từng bước theo thứ tự nhé! Nếu cần hỗ trợ bước nào, cứ nhắn tin cho mình.",
  nda: "Về thủ tục giấy tờ: Bạn có thể hỏi trực tiếp Admin để được hướng dẫn chi tiết.\n\nNếu có thắc mắc về nội dung điều khoản, hãy copy và hỏi ChatGPT/Gemini với lệnh: 'Giải thích nội dung này đơn giản nhất cho tôi'.",
};

const INITIAL_MESSAGES: ChatMessage[] = [{
  from: "bot",
  text: "Chào bạn! Mình ở đây để hỗ trợ bạn trong quy trình rời team. Bạn cần giúp đỡ về vấn đề nào?",
  buttons: [
    { label: "📩 Kiểm tra lịch hẹn/Kết quả", action: "check_result" },
    { label: "🗓️ Thay đổi lịch phỏng vấn", action: "reschedule" },
    { label: "📋 Quy trình rời team", action: "procedure" },
    { label: "🔐 Thủ tục & Giấy tờ", action: "nda" },
  ],
}];

const OutTeamChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendUserMessage = (text: string) => {
    setMessages(prev => [...prev, { from: "user", text }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: "Cảm ơn bạn đã nhắn tin! Team HR sẽ phản hồi sớm nhất có thể nhé 💜" }]);
    }, 800);
  };

  const handleBotAction = (action: string, label: string) => {
    setMessages(prev => [...prev, { from: "user", text: label }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: BOT_RESPONSES[action] ?? "Cảm ơn bạn! Team HR sẽ phản hồi sớm nhất có thể nhé 💜" }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="chat-slide-up w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-purple-600">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="NhiLe Team" className="w-7 h-7 rounded-full object-contain bg-white/20 shrink-0" />
              <span className="text-white font-black text-sm">HR Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors"><X size={16} /></button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-line
                  ${msg.from === "user" ? "bg-purple-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-700 rounded-bl-sm"}`}>
                  {msg.text}
                </div>
                {msg.buttons && (
                  <div className="mt-2 flex flex-col gap-1.5 w-full">
                    {msg.buttons.map((btn) => (
                      <button key={btn.action} onClick={() => handleBotAction(btn.action, btn.label)}
                        className="w-full text-left text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-colors">
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 flex items-center gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && input.trim()) { sendUserMessage(input.trim()); setInput(""); } }}
              placeholder="Nhập tin nhắn..."
              className="flex-1 text-sm px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 transition-colors placeholder:text-gray-400" />
            <button onClick={() => { if (!input.trim()) return; sendUserMessage(input.trim()); setInput(""); }}
              className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0">
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setIsOpen(p => !p)}
        className="w-14 h-14 rounded-full bg-purple-600 shadow-xl shadow-purple-500/30 flex items-center justify-center hover:bg-purple-700 hover:scale-110 active:scale-95 transition-all">
        {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>
    </div>
  );
};

export default OutTeamChatWidget;
