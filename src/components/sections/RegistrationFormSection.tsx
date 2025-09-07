import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";

interface FormData {
  name: string;
  email: string;
  telegram: string;
  motivation: string;
  goals: string;
  source: string;
  time_commitment: string;
  values_commitment: boolean;
  privacy_commitment: boolean;
}

interface RegistrationFormSectionProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const RegistrationFormSection = ({ open, setOpen }: RegistrationFormSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telegram: "",
    motivation: "",
    goals: "",
    source: "",
    time_commitment: "",
    values_commitment: false,
    privacy_commitment: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Fake API
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("📩 Submitted:", formData);

    setIsSubmitted(true);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSubmitted(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl mx-auto">
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-green-600">✅ Cảm ơn bạn đã đăng ký!</h3>
            <Button onClick={handleClose}>Đóng</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="telegram"
              placeholder="Telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="motivation"
              placeholder="Tại sao bạn muốn tham gia?"
              value={formData.motivation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="goals"
              placeholder="Mục tiêu của bạn..."
              value={formData.goals}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Bạn biết đến từ đâu?</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="friend">Bạn bè</option>
              <option value="other">Khác</option>
            </select>
            <select
              name="time_commitment"
              value={formData.time_commitment}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Thời gian cam kết / tuần</option>
              <option value="5-10">5 - 10 giờ</option>
              <option value="10-15">10 - 15 giờ</option>
              <option value="15-20">15 - 20 giờ</option>
              <option value="20+">Hơn 20 giờ</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="values_commitment"
                checked={formData.values_commitment}
                onChange={handleChange}
                required
              />
              <label>Cam kết đồng hành cùng Tâm - Tầm - Đức</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="privacy_commitment"
                checked={formData.privacy_commitment}
                onChange={handleChange}
                required
              />
              <label>Thông tin sẽ được bảo mật</label>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 text-white">
                {loading ? "Đang gửi..." : "Gửi Đơn"}
              </Button>
              <Button type="button" className="bg-green-600 text-white" onClick={handleSubmit}>
                Tham gia ngay
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Hủy / Đóng
              </Button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
};
