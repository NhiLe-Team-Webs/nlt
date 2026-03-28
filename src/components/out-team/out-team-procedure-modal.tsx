import { useRef, useState } from "react";
import { X, Image, Users, Link } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface UploadItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  linkLabel?: string;
  linkHref?: string;
}

const UPLOAD_ITEMS: UploadItem[] = [
  {
    icon: <Image size={20} className="text-purple-600" />,
    title: "Upload ảnh tháo khung",
    desc: "Gửi ảnh thể hiện bạn đã tháo khung theo đúng yêu cầu.",
  },
  {
    icon: <Users size={20} className="text-purple-600" />,
    title: "Upload ảnh đã out nhóm",
    desc: "Gửi ảnh thể hiện bạn đã rời các nhóm liên quan trong NhiLe Team.",
  },
  {
    icon: <Link size={20} className="text-purple-600" />,
    title: "Ký bảo mật rồi upload ảnh",
    desc: "Bấm vào link để ký trước, sau đó upload ảnh minh họa phần đã hoàn tất.",
    linkLabel: "Mở link ký bảo mật",
    linkHref: "https://sg1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBTVety-rac_6tDkmYwnVdmNmPWQbUwl3bv6r3XwaTnqMzGtFVh1dKVNBmCztFyBBo*",
  },
];

const UploadArea = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="mt-3 w-full border-2 border-dashed border-purple-200 rounded-2xl py-4 px-4 flex items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/30 transition-all"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <span className={`text-sm font-medium ${fileName ? "text-purple-700" : "text-gray-300"}`}>
        {fileName ?? "Khu vực upload ảnh minh họa"}
      </span>
    </div>
  );
};

const OutTeamProcedureModal = ({ isOpen, onClose, onSubmit }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm overlay-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl modal-pop overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">GIAO DIỆN TƯƠNG TÁC</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Title */}
          <div>
            <h3 className="text-xl font-black text-gray-900">Hoàn thành thủ tục</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Khi đã có kết quả, bạn upload đầy đủ các mục bên dưới để HR kiểm tra.
            </p>
          </div>

          {/* Notice */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3">
            <p className="text-sm font-semibold text-purple-700 leading-relaxed">
              Sau khi gửi xong, bạn cần chờ Admin xác nhận trước khi có thể rời team.
            </p>
          </div>

          {/* Upload items */}
          {UPLOAD_ITEMS.map((item, i) => (
            <div key={i} className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-black text-sm text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              {item.linkHref && (
                <a href={item.linkHref} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 mb-1 text-xs font-bold text-purple-600 border border-purple-300 rounded-xl px-3 py-1.5 hover:bg-purple-100 transition-colors">
                  🔗 {item.linkLabel}
                </a>
              )}
              <UploadArea />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-3 shrink-0 border-t border-gray-100">
          <button onClick={onSubmit}
            className="btn-pop w-full py-4 rounded-2xl bg-purple-600 text-white font-black text-sm shadow-lg hover:bg-purple-700 active:scale-95 transition-all">
            Gửi xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutTeamProcedureModal;
