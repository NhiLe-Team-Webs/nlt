interface FooterProps {
  onNavigate: (target: string, href?: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1 mb-8 lg:mb-0">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-white">
              NhiLe Team
            </button>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-white tracking-wider uppercase">Về chúng tôi</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Câu chuyện
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievements')} className="hover:text-white transition-colors">
                  Thành tựu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community-leaders')} className="hover:text-white transition-colors">
                  Đội ngũ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-white tracking-wider uppercase">Hoạt động</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Blog & Sự kiện
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community-synergy')} className="hover:text-white transition-colors">
                  Cộng đồng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partner-projects')} className="hover:text-white transition-colors">
                  Dự án
                </button>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-white tracking-wider uppercase">Kết nối</h4>
            <div className="flex space-x-5 mt-4">
              {/* Social Icons */}
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944,0C5.352,0,0,5.352,0,11.944s5.352,11.944,11.944,11.944s11.944-5.352,11.944-11.944S18.536,0,11.944,0z M16.928,8.232l-1.8,8.384c-0.128,0.576-0.512,0.704-0.992,0.448l-2.88-2.112l-1.376,1.312c-0.16,0.16-0.288,0.288-0.576,0.288l0.224-2.944l5.248-4.736c0.224-0.224-0.032-0.352-0.352-0.128L8.688,12.56l-2.816-0.896c-0.576-0.192-0.608-0.576,0.096-0.864l10.24-3.936C16.624,7.024,17.12,7.312,16.928,8.232z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-800 pt-8">
          <div className="container mx-auto px-6 text-sm flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">&copy; 2025 NhiLe Team. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Statement</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};