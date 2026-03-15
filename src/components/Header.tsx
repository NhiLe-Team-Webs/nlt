import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  ChevronDownIcon, 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  onNavigate: (target: string, href?: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state for demo
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const partnerDropdownRef = useRef<HTMLDivElement>(null);
  const userProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
        (partnerDropdownRef.current && !partnerDropdownRef.current.contains(event.target as Node)) &&
        (userProfileRef.current && !userProfileRef.current.contains(event.target as Node))
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNavClick = (target: string, href?: string) => {
    if (href) {
      window.location.href = href;
    } else {
      navigate(target);
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileAccordion = (accordion: string) => {
    setOpenMobileAccordion(openMobileAccordion === accordion ? null : accordion);
  };

  const handleLogin = () => {
    navigate("/verify-cccd");
    setOpenDropdown(null);
    setIsMobileMenuOpen(false); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('/home')} className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="NhiLe Team Logo" 
                className="h-10 sm:h-12 md:h-14 w-auto transition-transform hover:scale-105 duration-300" 
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:space-x-1 items-center">
            <button 
              onClick={() => handleNavClick('/story')} 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link"
            >
              Câu chuyện
            </button>
            
            {/* Community Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                type="button" 
                className={`text-slate-600 hover:text-slate-900 inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link ${openDropdown === 'community' ? 'bg-slate-50 text-slate-900' : ''}`}
                onClick={() => toggleDropdown('community')}
              >
                Cộng đồng
                <ChevronDownIcon 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openDropdown === 'community' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`dropdown-menu absolute -left-4 top-full z-10 mt-2 w-60 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-slate-900/5 ${
                  openDropdown === 'community' ? 'open' : ''
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-1">
                  <button 
                    onClick={() => handleNavClick('/community-leaders')} 
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Leaders cộng đồng
                  </button>
                  <button 
                    onClick={() => handleNavClick('/community-synergy')} 
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Cộng đồng cộng hưởng
                  </button>
                </div>
              </div>
            </div>
            
            <a 
              href="https://nlf.sg/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link"
            >
              NhiLe Foundation
            </a>

            {/* Partner Dropdown */}
            <div className="relative" ref={partnerDropdownRef}>
              <button 
                type="button" 
                className={`text-slate-600 hover:text-slate-900 inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link ${openDropdown === 'partner' ? 'bg-slate-50 text-slate-900' : ''}`}
                onClick={() => toggleDropdown('partner')}
              >
                Đối tác
                <ChevronDownIcon 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openDropdown === 'partner' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`dropdown-menu absolute -left-4 top-full z-10 mt-2 w-60 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-slate-900/5 ${
                  openDropdown === 'partner' ? 'open' : ''
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-1">
                  <button 
                    onClick={() => handleNavClick('/partner-projects')} 
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Dự án đã hoàn thành
                  </button>
                  <button 
                    onClick={() => handleNavClick('/partner-testimonials')} 
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Đối tác của chúng tôi
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleNavClick('/achievements')} 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link"
            >
              Thành tựu
            </button>
            <button 
              onClick={() => handleNavClick('/blog')} 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('/faq')} 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-slate-50 nav-link"
            >
              FAQ
            </button>
          </nav>
          
          {/* Right side items */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={handleLogin}
                  className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-sm"
                >
                  Đăng nhập
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* User Profile Dropdown */}
                <div className="relative flex items-center" ref={userProfileRef}>
                  <button 
                    type="button" 
                    className={`flex items-center gap-x-2 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl transition-all hover:bg-slate-100 ${openDropdown === 'user' ? 'bg-slate-100' : ''}`}
                    onClick={() => toggleDropdown('user')}
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-inner">
                        <UserIcon className="h-4.5 w-4.5 text-slate-600" />
                    </div>
                    <span className="text-sm font-bold hidden md:block uppercase tracking-tight">LE THAO NHI</span>
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openDropdown === 'user' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Dropdown Menu (Synced with Screenshot Aesthetic) */}
                  <div 
                    className={`dropdown-menu absolute right-0 top-full z-10 mt-4 w-56 rounded-lg bg-white shadow-2xl border border-slate-100 ${
                      openDropdown === 'user' ? 'open' : ''
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative pt-1 overflow-visible">
                      {/* Notch/Arrow with Red Background at the top */}
                      <div className="absolute -top-[1.5px] left-0 right-0 h-1.5 bg-red-600 rounded-t-lg"></div>
                      <div className="absolute -top-1.5 right-10 h-3 w-3 rotate-45 bg-red-600"></div>
                      
                      <div className="flex flex-col mt-1.5">
                        <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-50">
                           <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-slate-500" />
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">LE THAO NHI</span>
                        </div>
                        <button 
                          onClick={() => handleNavClick('/select-role')} 
                          className="group flex items-center gap-3 px-5 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 w-full text-left transition-all border-b border-slate-50"
                        >
                          <HomeIcon className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          Tham gia ngay
                        </button>
                        <button 
                          onClick={handleLogout} 
                          className="group flex items-center gap-3 px-5 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600 w-full text-left transition-all"
                        >
                          <LockClosedIcon className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
            
            {/* Mobile menu button removed for logged in users as per feedback */}
            {!isLoggedIn && (
              <div className="flex lg:hidden">
                <button 
                  type="button" 
                  className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu with updated Premium UI */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-2xl overflow-y-auto max-h-[calc(100vh-64px)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleNavClick('/story')} 
                className="text-slate-800 hover:bg-blue-50 hover:text-blue-700 block rounded-xl px-4 py-3.5 text-base font-bold transition-all"
              >
                Câu chuyện
              </button>
              
              {/* Mobile Community Accordion */}
              <div>
                <button 
                  onClick={() => toggleMobileAccordion('community')}
                  className={`w-full text-slate-800 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all ${openMobileAccordion === 'community' ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  <span>Cộng đồng</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openMobileAccordion === 'community' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileAccordion === 'community' && (
                  <div className="mt-2 space-y-1 pl-4 border-l-4 border-blue-100 ml-6 animate-in fade-in slide-in-from-left-2 duration-300">
                    <button 
                      onClick={() => handleNavClick('/community-leaders')} 
                      className="text-slate-600 hover:text-blue-600 block rounded-lg px-4 py-3 text-base font-semibold w-full text-left"
                    >
                      Leaders cộng đồng
                    </button>
                    <button 
                      onClick={() => handleNavClick('/community-synergy')} 
                      className="text-slate-600 hover:text-blue-600 block rounded-lg px-4 py-3 text-base font-semibold w-full text-left"
                    >
                      Cộng đồng cộng hưởng
                    </button>
                  </div>
                )}
              </div>

              <a 
                href="https://nlf.sg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-800 hover:bg-blue-50 hover:text-blue-700 block rounded-xl px-4 py-3.5 text-base font-bold transition-all"
              >
                NhiLe Foundation
              </a>

              {/* Mobile Partner Accordion */}
              <div>
                <button 
                  onClick={() => toggleMobileAccordion('partner')}
                  className={`w-full text-slate-800 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all ${openMobileAccordion === 'partner' ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  <span>Đối tác</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-300 ${
                      openMobileAccordion === 'partner' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileAccordion === 'partner' && (
                  <div className="mt-2 space-y-1 pl-4 border-l-4 border-blue-100 ml-6 animate-in fade-in slide-in-from-left-2 duration-300">
                    <button 
                      onClick={() => handleNavClick('/partner-projects')} 
                      className="text-slate-600 hover:text-blue-600 block rounded-lg px-4 py-3 text-base font-semibold w-full text-left"
                    >
                      Dự án đã hoàn thành
                    </button>
                    <button 
                      onClick={() => handleNavClick('/partner-testimonials')} 
                      className="text-slate-600 hover:text-blue-600 block rounded-lg px-4 py-3 text-base font-semibold w-full text-left"
                    >
                      Đối tác của chúng tôi
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleNavClick('/achievements')} 
                className="text-slate-800 hover:bg-blue-50 hover:text-blue-700 block rounded-xl px-4 py-3.5 text-base font-bold transition-all"
              >
                Thành tựu
              </button>
              <button 
                onClick={() => handleNavClick('/blog')} 
                className="text-slate-800 hover:bg-blue-50 hover:text-blue-700 block rounded-xl px-4 py-3.5 text-base font-bold transition-all"
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavClick('/faq')} 
                className="text-slate-800 hover:bg-blue-50 hover:text-blue-700 block rounded-xl px-4 py-3.5 text-base font-bold transition-all"
              >
                FAQ
              </button>
            </div>

            {/* Auth section in mobile menu */}
            <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
              {!isLoggedIn ? (
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={handleLogin} 
                    className="bg-white border-2 border-slate-100 text-slate-800 block rounded-2xl px-6 py-4 text-lg font-extrabold text-center w-full shadow-sm active:scale-95 transition-transform"
                  >
                    Đăng nhập
                  </button>
                  <button 
                    onClick={() => handleNavClick('/home#register-form')} 
                    className="bg-blue-600 text-white block rounded-2xl px-6 py-4 text-lg font-extrabold text-center w-full shadow-lg active:scale-95 transition-transform"
                  >
                    Tham gia ngay
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                      <UserIcon className="h-8 w-8 text-slate-700" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl font-black text-slate-900 leading-none mb-1">LE THAO NHI</p>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Thành viên</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleNavClick('/profile')} 
                      className="text-slate-700 hover:bg-white hover:shadow-md block rounded-xl px-4 py-4 text-base font-bold w-full text-left flex items-center gap-4 transition-all"
                    >
                      <UserIcon className="h-6 w-6 text-slate-400" />
                      Thông tin cá nhân
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="text-red-500 hover:bg-white hover:shadow-md block rounded-xl px-4 py-4 text-base font-bold w-full text-left flex items-center gap-4 transition-all"
                    >
                      <LockClosedIcon className="h-6 w-6 text-red-300" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};