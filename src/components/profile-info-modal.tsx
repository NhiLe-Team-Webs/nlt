import { useState } from "react";
import { X } from "lucide-react";

interface ProfileInfoModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const FIELDS_LEFT = [
  { key: "fullName", label: "Họ và tên", type: "text" },
  { key: "username", label: "Username", type: "text" },
  { key: "gmail", label: "Gmail NhiLe Team", type: "email" },
  { key: "dob", label: "Ngày sinh", type: "date" },
  { key: "phone", label: "SĐT", type: "tel" },
  { key: "facebook", label: "Link FB", type: "url" },
  { key: "linkedin", label: "Link LinkedIn", type: "url" },
  { key: "address", label: "Địa chỉ", type: "text" },
  { key: "device", label: "Thiết bị dùng làm việc", type: "text" },
];

const FIELDS_RIGHT = [
  { key: "sunSign", label: "Cung Sun", type: "text" },
  { key: "moonSign", label: "Cung Moon", type: "text" },
  { key: "risingSign", label: "Cung Mọc", type: "text" },
  { key: "lifeNumber", label: "Số chủ đạo", type: "text" },
  { key: "soulNumber", label: "Số linh hồn", type: "text" },
  { key: "maturityNumber", label: "Số trưởng thành", type: "text" },
];

export default function ProfileInfoModal({ onClose, onSubmit }: ProfileInfoModalProps) {
  const [form, setForm] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-[#1D1D1F]">Điền thông tin cá nhân</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Thông tin của bạn sẽ được bảo mật</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-7 py-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-3">
              {FIELDS_LEFT.map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs font-black text-gray-500 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-3">
              {FIELDS_RIGHT.map(({ key, label, type }) => (
                <div key={key}>
                  <label className="block text-xs font-black text-gray-500 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-gray-100">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-black text-sm text-gray-500 hover:bg-gray-100 transition-colors">
            Quay lại
          </button>
          <button onClick={handleSubmit} className="px-8 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-black text-sm transition-colors shadow-lg shadow-blue-500/20">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
