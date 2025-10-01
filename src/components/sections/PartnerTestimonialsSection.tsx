import { useState, useRef, useEffect } from 'react'
import { usePartnerTestimonials } from '../../hooks/usePartnerTestimonials'

export const PartnerTestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { data: testimonials, isLoading, isError, error } = usePartnerTestimonials()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

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
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Đối tác nói gì về chúng tôi?
          </h2>
          <p className="text-lg text-slate-600 mt-4">
            Niềm tin của đối tác là thước đo cho sự thành công của NhiLe Team.
          </p>
        </div>

        {isLoading && <p className="text-center text-slate-500">Đang tải...</p>}
        {isError && <p className="text-center text-red-500">Lỗi: {error?.message}</p>}
        {!isLoading && testimonials?.length === 0 && (
          <p className="text-center text-slate-400">Chưa có lời chứng thực nào.</p>
        )}

        <div className="space-y-20">
          {testimonials?.map((t, index) => (
            <div
              key={t.id}
              className={`flex flex-col items-center gap-8 ${
                index % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : 'sm:flex-row sm:text-left'
              }`}
            >
              <img
                src={t.avatar_url}
                alt={t.partner_name}
                className="w-40 h-40 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              <div>
                <p className="text-xl text-slate-700 italic leading-relaxed">"{t.testimonial}"</p>
                <p className="mt-4 font-bold text-slate-900">- {t.partner_name}</p>
                <p className="text-slate-500">{t.partner_title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
