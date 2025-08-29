export const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="text-center py-20 md:py-32 relative overflow-hidden bg-slate-50 bg-[radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)] bg-[length:2rem_2rem]">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-slate-50 z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
          Hành Trình Của NhiLe Team
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Chúng tôi tin vào sức mạnh của lòng nhân ái và tri thức. Cùng nhau, chúng ta xây dựng một di sản bền vững cho thế hệ mai sau.
        </p>
        <button 
          onClick={scrollToAbout}
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform hover:scale-105 duration-300 text-lg inline-block shadow-lg shadow-blue-500/20"
        >
          Khám phá câu chuyện
        </button>
      </div>
    </section>
  );
};