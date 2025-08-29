import { useState, useEffect, useRef } from 'react';

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

export const RegistrationFormSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    telegram: '',
    motivation: '',
    goals: '',
    source: '',
    time_commitment: '',
    values_commitment: false,
    privacy_commitment: false
  });
  
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isSubmitted) {
    return (
      <section 
        id="register-form" 
        ref={sectionRef}
        className={`py-16 md:py-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center bg-green-100 border border-green-200 text-green-800 px-6 py-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-2">Cảm ơn bạn đã đăng ký!</h3>
            <p>Chúng tôi đã nhận được đơn đăng ký của bạn và sẽ xem xét cẩn thận. Chào mừng bạn đến với hành trình của NhiLe Team!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="register-form" 
      ref={sectionRef}
      className={`py-16 md:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Trở Thành Một Phần Của Hành Trình
          </h2>
          <p className="text-slate-600 mt-4 mb-8">
            Điền vào biểu mẫu dưới đây để đăng ký tham gia NhiLe Team. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
              Thông Tin Cá Nhân
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
                  Họ và Tên
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A" 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
                  Địa chỉ Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com" 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                  required 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="telegram" className="block mb-2 text-sm font-medium text-slate-700">
                Telegram Username
              </label>
              <input 
                type="text" 
                id="telegram" 
                name="telegram" 
                value={formData.telegram}
                onChange={handleChange}
                placeholder="@username" 
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                required 
              />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8 border-b pb-2">
              Nhu Cầu & Mục Tiêu
            </h3>
            
            <div className="mb-6">
              <label htmlFor="motivation" className="block mb-2 text-sm font-medium text-slate-700">
                Tại sao bạn muốn tham gia NhiLe Team?
              </label>
              <textarea 
                id="motivation" 
                name="motivation" 
                value={formData.motivation}
                onChange={handleChange}
                rows={4} 
                placeholder="Chia sẻ lý do và câu chuyện của bạn..." 
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="goals" className="block mb-2 text-sm font-medium text-slate-700">
                Bạn mong muốn nhận được điều gì nhất từ NhiLe Team (ví dụ: học kỹ năng, kết nối, cơ hội nghề nghiệp)?
              </label>
              <textarea 
                id="goals" 
                name="goals" 
                value={formData.goals}
                onChange={handleChange}
                rows={4} 
                placeholder="Mục tiêu cụ thể của bạn là gì..." 
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="source" className="block mb-2 text-sm font-medium text-slate-700">
                Bạn biết đến NhiLe Team từ đâu?
              </label>
              <select 
                id="source" 
                name="source" 
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                required
              >
                <option value="" disabled>Vui lòng chọn</option>
                <option value="youtube">Kênh YouTube của chị Nhi Lê</option>
                <option value="facebook">Facebook</option>
                <option value="friend">Bạn bè giới thiệu</option>
                <option value="other">Nguồn khác</option>
              </select>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-4 mt-8 border-b pb-2">
              Cam Kết
            </h3>
            
            <div className="mb-6">
              <label htmlFor="time_commitment" className="block mb-2 text-sm font-medium text-slate-700">
                Bạn có thể cam kết dành bao nhiêu thời gian mỗi tuần cho việc học và thực tập cùng team?
              </label>
              <select 
                id="time_commitment" 
                name="time_commitment" 
                value={formData.time_commitment}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition" 
                required
              >
                <option value="" disabled>Vui lòng chọn</option>
                <option value="5-10">5 - 10 giờ / tuần</option>
                <option value="10-15">10 - 15 giờ / tuần</option>
                <option value="15-20">15 - 20 giờ / tuần</option>
                <option value="20+">Hơn 20 giờ / tuần</option>
              </select>
            </div>
            
            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <input 
                  id="values_commitment" 
                  name="values_commitment" 
                  type="checkbox" 
                  checked={formData.values_commitment}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 mt-1" 
                  required 
                />
                <label htmlFor="values_commitment" className="ml-3 text-sm text-slate-700">
                  Tôi đã đọc và cam kết đồng hành cùng các giá trị cốt lõi của NhiLe Team: <strong>Tâm - Tầm - Đức.</strong>
                </label>
              </div>
              <div className="flex items-start">
                <input 
                  id="privacy_commitment" 
                  name="privacy_commitment" 
                  type="checkbox" 
                  checked={formData.privacy_commitment}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 mt-1" 
                  required 
                />
                <label htmlFor="privacy_commitment" className="ml-3 text-sm text-slate-700">
                  Tôi hiểu rằng tất cả thông tin cung cấp sẽ được <strong>bảo mật hoàn toàn</strong> và chỉ sử dụng cho mục đích tuyển chọn của NhiLe Team.
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Gửi Đơn Đăng Ký
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};