// src/components/sections/AchievementsSection.tsx

import { achievementCategories } from '../../data/achievements';
import { Link } from 'react-router-dom';

export const AchievementsSection = () => {
  return (
    <section id="achievements-section" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Thành tựu & Dự án Nổi bật
          </h2>
        </div>
        <div className="space-y-12">
          {achievementCategories.map((category, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900">{category.categoryTitle}</h3>
              <p className="mt-2 text-slate-600">{category.categoryDescription}</p>
              <div className="mt-4">
                <Link
                  to={`/achievements/${category.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};