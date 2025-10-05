import { useState, useRef, useEffect } from 'react';




// Import all necessary images
import annyLongAvt from '../../asset/anny_long-avt.png';
import denisAvt from '../../asset/denis-avt.jpg';
import hieuPcAvt from '../../asset/hieu_pc-avt.png';
import paulineAvt from '../../asset/pauline-avt.png';
import yanJiangAvt from '../../asset/yan_jiang-avt.jpg';




export const PartnerTestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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




  const testimonials = [
    {
      name: 'Danny Loong',
      title: 'CEO Timbre Group',
      quote: 'Đội ngũ NhiLe Team tràn đầy sự tích cực và năng lượng tốt',
      image: annyLongAvt,
      alignment: 'sm:flex-row-reverse',
      textAlign: 'sm:text-right',
    },
    {
      name: 'Pauline Teo',
      title: 'Health and Wealth Coach',
      quote: 'NhiLe Team là đội ngũ thật sự rất tuyệt vời, chuyên nghiệp…',
      image: paulineAvt,
      alignment: 'sm:flex-row',
      textAlign: 'sm:text-left',
    },
    {
      name: 'Denise Wong',
      title: 'Public Speaker',
      quote: 'Làm việc cùng NhiLe Team hơn 3 năm qua và tôi vẫn rất hào hứng…',
      image: denisAvt,
      alignment: 'sm:flex-row-reverse',
      textAlign: 'sm:text-right',
    },
    {
      name: 'Yan Jiang',
      title: 'Director of Operations, ACS Freight Services Pte Ltd',
      quote: 'NhiLe Team là đội ngũ trẻ làm việc rất chuyên nghiệp và nhanh chóng',
      image: yanJiangAvt,
      alignment: 'sm:flex-row',
      textAlign: 'sm:text-left',
    },
    {
      name: 'Hieu PC',
      title: 'Chuyên gia an ninh mạng',
      quote: 'NhiLeTeam là đội ngũ trẻ nhiều nhiệt huyết, làm việc năng động và học hỏi rất nhanh…',
      image: hieuPcAvt,
      alignment: 'sm:flex-row-reverse',
      textAlign: 'sm:text-right',
    },
  ];




  return (
    <section
      id="partner-testimonials-page"
      ref={sectionRef}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Đối tác nói gì về chúng tôi?</h2>
          <p className="text-lg text-slate-600 mt-4">
            Niềm tin của đối tác là thước đo cho sự thành công của NhiLe Team.
          </p>
        </div>

  

        <div className="space-y-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 ${testimonial.alignment}`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-40 h-40 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              <div className={`text-center ${testimonial.textAlign}`}>
                <p className="text-xl text-slate-700 italic leading-relaxed">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-slate-900">- {testimonial.name}</p>
                <p className="text-slate-500">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
