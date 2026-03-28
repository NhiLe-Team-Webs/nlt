import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const isAvailableDate = (d: number) => {
  const dt = new Date(2026, 2, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return [2, 3, 5].includes(dt.getDay()) && dt >= today;
};
const OFFSET = (() => { const fd = new Date(2026, 2, 1).getDay(); return fd === 0 ? 6 : fd - 1; })();

const OutTeamCalendarModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl modal-pop overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ĐẶT LỊCH PHỎNG VẤN</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Calendar */}
            <div className="flex-1 space-y-3">
              <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider">Tháng 3, 2026</h4>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
                  <span key={d} className="text-[10px] font-black text-gray-300 uppercase py-1">{d}</span>
                ))}
                {Array.from({ length: OFFSET }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                  const available = isAvailableDate(date);
                  const isSelected = date === selectedDate;
                  return (
                    <button key={date} disabled={!available}
                      onClick={() => available && setSelectedDate(date)}
                      className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black transition-all
                        ${isSelected ? "bg-purple-600 text-white scale-110 shadow-lg shadow-purple-400/30"
                          : available ? "text-gray-800 hover:bg-purple-50 hover:text-purple-600 cursor-pointer"
                          : "text-gray-200 cursor-not-allowed"}`}>
                      {date}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-400 font-bold">✓ Thứ 3, Thứ 4, Thứ 6 hàng tuần</p>
            </div>

            {/* Time slots */}
            <div className="sm:w-36 space-y-3">
              <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider">Khung giờ</h4>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                {["19:00","19:30","20:00","20:30"].map((t) => (
                  <button key={t} onClick={() => setSelectedTime(t)}
                    className={`py-3 px-4 border-2 rounded-xl text-sm font-black transition-all text-center
                      ${selectedTime === t ? "border-purple-600 text-purple-700 bg-purple-50" : "border-gray-100 text-gray-700 hover:border-purple-300 hover:bg-purple-50/40"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={!selectedDate || !selectedTime}
            onClick={() => { if (!selectedDate || !selectedTime) return; onConfirm(); }}
            className={`btn-pop mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all
              ${selectedDate && selectedTime ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
            📅 Xác nhận lịch hẹn
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutTeamCalendarModal;
