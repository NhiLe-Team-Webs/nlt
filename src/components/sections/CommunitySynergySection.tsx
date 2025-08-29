import { useState } from 'react';

export const CommunitySynergySection = () => {
  const [activeTopic, setActiveTopic] = useState('ai');

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic);
  };

  return (
    <section id="community-synergy-page" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Cộng Đồng Cộng Hưởng</h2>
          <p className="text-lg text-slate-600 mt-4">
            Nơi sức mạnh tập thể được phát huy. Chọn một chủ đề để khám phá các hoạt động và kết nối với những người cùng chung mục tiêu.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Left Column: Topic List */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-4 px-3">Các Nhóm Học Tập</h3>
              <nav className="flex flex-col space-y-1" id="topic-list">
                <a 
                  href="#" 
                  data-topic="ai" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'ai' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('ai'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Học AI</span>
                </a>
                <a 
                  href="#" 
                  data-topic="ops" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'ops' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('ops'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Vận hành</span>
                </a>
                <a 
                  href="#" 
                  data-topic="volunteer" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'volunteer' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('volunteer'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Tình nguyện</span>
                </a>
                <a 
                  href="#" 
                  data-topic="canva" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'canva' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('canva'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Học Canva & Editing</span>
                </a>
                <a 
                  href="#" 
                  data-topic="ready" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'ready' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('ready'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Khi bạn sẵn sàng</span>
                </a>
                <a 
                  href="#" 
                  data-topic="men" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'men' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('men'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" />
                  </svg>
                  <span>NAM - Chỉ cho Nam Nhi Việt</span>
                </a>
                <a 
                  href="#" 
                  data-topic="moms" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'moms' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('moms'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Những người mẹ học cùng NhiLe</span>
                </a>
                <a 
                  href="#" 
                  data-topic="teens" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'teens' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('teens'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2v2z" />
                  </svg>
                  <span>Dạy con tuổi teen</span>
                </a>
                <a 
                  href="#" 
                  data-topic="u40" 
                  className={`topic-link flex items-center p-3 rounded-lg font-medium transition-colors ${activeTopic === 'u40' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={(e) => { e.preventDefault(); handleTopicClick('u40'); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  <span>U40+ học Tech</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Right Column: Content based on selected topic */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {activeTopic === 'ai' && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Học AI - Khám Phá Tương Lai</h3>
                  <p className="text-slate-600 mb-4">Tham gia các buổi học trực tuyến và thực hành về trí tuệ nhân tạo, machine learning và deep learning.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900">Khóa học cơ bản</h4>
                      <p className="text-sm text-slate-600">Học lập trình Python, toán thống kê cơ bản</p>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900">Khóa học nâng cao</h4>
                      <p className="text-sm text-slate-600">Deep learning, neural networks, computer vision</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTopic === 'ops' && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Vận hành - Quản lý Dự án</h3>
                  <p className="text-slate-600 mb-4">Kỹ năng quản lý dự án, tổ chức sự kiện, và vận hành cộng đồng hiệu quả.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900">Quản lý thời gian</h4>
                      <p className="text-sm text-slate-600">Các phương pháp quản lý thời gian hiệu quả</p>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900">Tổ chức sự kiện</h4>
                      <p className="text-sm text-slate-600">Kỹ năng tổ chức sự kiện cộng đồng thành công</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Thêm các topic khác nếu cần */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};