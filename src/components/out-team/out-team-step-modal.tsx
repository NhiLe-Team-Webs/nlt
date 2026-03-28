interface Props {
  isOpen: boolean;
  context: "quiz" | "calendar" | "interview-result";
  onContinue: () => void;
}

const OutTeamStepModal = ({ isOpen, context, onContinue }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" />
      <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl text-center space-y-4 modal-pop">
        {context === "quiz" ? (
          <>
            <div className="text-5xl icon-spin-pop">⭐</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900">Chúc mừng bạn!</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Bạn đã vượt qua bài test một cách xuất sắc! Hãy tiếp tục chọn một khung giờ phù hợp để chúng mình có thể trò chuyện trực tiếp nha.
              </p>
            </div>
          </>
        ) : context === "calendar" ? (
          <>
            <div className="text-5xl icon-float">🎉</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900">Tuyệt vời quá!</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Bạn đã đặt lịch thành công! Hãy kiểm tra email thường xuyên để nhận thông tin chi tiết về buổi phỏng vấn nhé. Tụi mình chờ bạn!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl icon-float">🎉</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-gray-900">Hoàn thành!</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Bạn đang làm rất tốt, cứ giữ vững tinh thần này nhé! Chỉ còn một xíu nữa thôi.
              </p>
            </div>
          </>
        )}
        <button onClick={onContinue} className="w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
          {context === "interview-result" ? "Hoàn tất" : "Đi tiếp thôi nào!"}
        </button>
      </div>
    </div>
  );
};

export default OutTeamStepModal;
