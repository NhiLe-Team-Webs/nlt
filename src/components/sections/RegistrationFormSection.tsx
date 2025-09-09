import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegistrationFormSection = ({ open, setOpen }: RegistrationFormSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: keyof FormData) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Fake API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("📩 Submitted:", formData);

    setIsSubmitted(true);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Trở Thành Một Phần Của Hành Trình</DialogTitle>
          <DialogDescription>
            Điền vào biểu mẫu dưới đây để đăng ký tham gia NhiLe Team. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>
        <div id="form-container" className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
          {isSubmitted ? (
            <div id="success-message" className="max-w-xl mx-auto text-center bg-green-100 border border-green-200 text-green-800 px-6 py-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Cảm ơn bạn đã đăng ký!</h3>
              <p>Chúng tôi đã nhận được đơn đăng ký của bạn và sẽ xem xét cẩn thận. Chào mừng bạn đến với hành trình của NhiLe Team!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Thông Tin Cá Nhân</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <Label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">Họ và Tên</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">Địa chỉ Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-6">
                <Label htmlFor="telegram" className="block mb-2 text-sm font-medium text-slate-700">Telegram Username</Label>
                <Input 
                  id="telegram" 
                  name="telegram" 
                  placeholder="@username" 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                  required 
                  value={formData.telegram}
                  onChange={handleChange}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8 border-b pb-2">Nhu Cầu & Mục Tiêu</h3>
              <div className="mb-6">
                <Label htmlFor="motivation" className="block mb-2 text-sm font-medium text-slate-700">Tại sao bạn muốn tham gia NhiLe Team?</Label>
                <Textarea 
                  id="motivation" 
                  name="motivation" 
                  rows={4} 
                  placeholder="Chia sẻ lý do và câu chuyện của bạn..." 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                  required 
                  value={formData.motivation}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="goals" className="block mb-2 text-sm font-medium text-slate-700">Bạn mong muốn nhận được điều gì nhất từ NhiLe Team (ví dụ: học kỹ năng, kết nối, cơ hội nghề nghiệp)?</Label>
                <Textarea 
                  id="goals" 
                  name="goals" 
                  rows={4} 
                  placeholder="Mục tiêu cụ thể của bạn là gì..." 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                  required 
                  value={formData.goals}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="source" className="block mb-2 text-sm font-medium text-slate-700">Bạn biết đến NhiLe Team từ đâu?</Label>
                <Select
                  name="source"
                  value={formData.source}
                  onValueChange={handleSelectChange('source')}
                >
                  <SelectTrigger className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
                    <SelectValue placeholder="Vui lòng chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">Kênh YouTube của chị Nhi Lê</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="friend">Bạn bè giới thiệu</SelectItem>
                    <SelectItem value="other">Nguồn khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8 border-b pb-2">Cam Kết</h3>
              <div className="mb-6">
                <Label htmlFor="time_commitment" className="block mb-2 text-sm font-medium text-slate-700">Bạn có thể cam kết dành bao nhiêu thời gian mỗi tuần cho việc học và thực tập cùng team?</Label>
                <Select
                  name="time_commitment"
                  value={formData.time_commitment}
                  onValueChange={handleSelectChange('time_commitment')}
                >
                  <SelectTrigger className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
                    <SelectValue placeholder="Vui lòng chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10">5 - 10 giờ / tuần</SelectItem>
                    <SelectItem value="10-15">10 - 15 giờ / tuần</SelectItem>
                    <SelectItem value="15-20">15 - 20 giờ / tuần</SelectItem>
                    <SelectItem value="20+">Hơn 20 giờ / tuần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-8 space-y-4">
                <div className="flex items-start">
                  <Checkbox 
                    id="values_commitment" 
                    name="values_commitment"
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 mt-1" 
                    checked={formData.values_commitment}
                    onCheckedChange={handleCheckboxChange('values_commitment')}
                    required 
                  />
                  <Label htmlFor="values_commitment" className="ml-3 text-sm text-slate-700">
                    Tôi đã đọc và cam kết đồng hành cùng các giá trị cốt lõi của NhiLe Team: <strong>Tâm - Tầm - Đức.</strong>
                  </Label>
                </div>
                <div className="flex items-start">
                  <Checkbox 
                    id="privacy_commitment" 
                    name="privacy_commitment"
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 mt-1" 
                    checked={formData.privacy_commitment}
                    onCheckedChange={handleCheckboxChange('privacy_commitment')}
                    required 
                  />
                  <Label htmlFor="privacy_commitment" className="ml-3 text-sm text-slate-700">
                    Tôi hiểu rằng tất cả thông tin cung cấp sẽ được <strong>bảo mật hoàn toàn</strong> và chỉ sử dụng cho mục đích tuyển chọn của NhiLe Team.
                  </Label>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi Đơn Đăng Ký"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};