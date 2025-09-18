  import { useState, useRef, useEffect } from 'react';
  import { useNavigate } from "react-router-dom";
  import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
  
  interface HeaderProps {
    onNavigate: (target: string, href?: string) => void;
  }

  export const Header = ({ onNavigate }: HeaderProps) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const partnerDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
          (partnerDropdownRef.current && !partnerDropdownRef.current.contains(event.target as Node))
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

    return (
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/80">
        <div className="container mx-auto px-6">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
        
<div className="flex-shrink-0">
  <button onClick={() => handleNavClick('/home')}>
    <img src="/logo.svg" alt="N Ơi" className="h-10 md:h-12 w-auto" />
  </button>
</div>
            {/* Desktop Navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
              <button 
                onClick={() => handleNavClick('/story')} 
                className="text-slate-600 hover:text-slate-900 text-sm font-medium relative transition-colors nav-link"
              >
                Câu chuyện
              </button>
              
              {/* Community Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  type="button" 
                  className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-x-1 text-sm font-medium relative nav-link"
                  onClick={() => toggleDropdown('community')}
                >
                  Cộng đồng
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === 'community' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`dropdown-menu absolute -left-8 top-full z-10 mt-5 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-900/5 ${
                    openDropdown === 'community' ? 'open' : ''
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => handleNavClick('/community-leaders')} 
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-slate-900 hover:bg-slate-50 w-full text-left"
                  >
                    Leaders cộng đồng
                  </button>
                  <button 
                    onClick={() => handleNavClick('/community-synergy')} 
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-slate-900 hover:bg-slate-50 w-full text-left"
                  >
                    Cộng đồng cộng hưởng
                  </button>
                </div>
              </div>
              
              <a 
                href="https://nlf.sg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 hover:text-slate-900 text-sm font-medium relative nav-link"
              >
                NhiLe Foundation
              </a>

              {/* Partner Dropdown */}
              <div className="relative" ref={partnerDropdownRef}>
                <button 
                  type="button" 
                  className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-x-1 text-sm font-medium relative nav-link"
                  onClick={() => toggleDropdown('partner')}
                >
                  Đối tác
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === 'partner' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`dropdown-menu absolute -left-8 top-full z-10 mt-5 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-900/5 ${
                    openDropdown === 'partner' ? 'open' : ''
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => handleNavClick('/partner-projects')} 
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-slate-900 hover:bg-slate-50 w-full text-left"
                  >
                    Dự án đã hoàn thành
                  </button>
                  <button 
                    onClick={() => handleNavClick('/partner-testimonials')} 
                    className="block rounded-lg px-3 py-2 text-sm font-medium leading-6 text-slate-900 hover:bg-slate-50 w-full text-left"
                  >
                    Đối tác của chúng tôi
                  </button>
                </div>
              </div>

              <button 
                onClick={() => handleNavClick('/achievements')} 
                className="text-slate-600 hover:text-slate-900 text-sm font-medium relative nav-link"
              >
                Thành tựu
              </button>
              <button 
                onClick={() => handleNavClick('/blog')} 
                className="text-slate-600 hover:text-slate-900 text-sm font-medium relative nav-link"
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavClick('/faq')} 
                className="text-slate-600 hover:text-slate-900 text-sm font-medium relative nav-link"
              >
                FAQ
              </button>
            </nav>
            
            {/* Right side items */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button 
                onClick={() => handleNavClick('/home#register-form')} 
                className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-700 transition-colors duration-300 hidden sm:block"
              >
                Tham gia ngay
              </button>
              
              {/* Mobile menu button */}
              <div className="flex sm:hidden">
                <button 
                  type="button" 
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-900"
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
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <button 
                onClick={() => handleNavClick('/story')} 
                className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
              >
                Câu chuyện
              </button>
              
              {/* Mobile Community Accordion */}
              <div>
                <button 
                  onClick={() => toggleMobileAccordion('community')}
                  className="w-full text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-between rounded-md px-3 py-2 text-base font-medium"
                >
                  <span>Cộng đồng</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform ${
                      openMobileAccordion === 'community' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileAccordion === 'community' && (
                  <div className="mt-1 space-y-1 pl-5">
                    <button 
                      onClick={() => handleNavClick('/community-leaders')} 
                      className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                    >
                      Leaders cộng đồng
                    </button>
                    <button 
                      onClick={() => handleNavClick('/community-synergy')} 
                      className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
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
                className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium"
              >
                NhiLe Foundation
              </a>

              {/* Mobile Partner Accordion */}
              <div>
                <button 
                  onClick={() => toggleMobileAccordion('partner')}
                  className="w-full text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-between rounded-md px-3 py-2 text-base font-medium"
                >
                  <span>Đối tác</span>
                  <ChevronDownIcon 
                    className={`h-5 w-5 transition-transform ${
                      openMobileAccordion === 'partner' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openMobileAccordion === 'partner' && (
                  <div className="mt-1 space-y-1 pl-5">
                    <button 
                      onClick={() => handleNavClick('/partner-projects')} 
                      className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                    >
                      Dự án đã hoàn thành
                    </button>
                    <button 
                      onClick={() => handleNavClick('/partner-testimonials')} 
                      className="text-slate-600 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                    >
                      Đối tác của chúng tôi
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleNavClick('/achievements')} 
                className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
              >
                Thành tựu
              </button>
              <button 
                onClick={() => handleNavClick('/blog')} 
                className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavClick('/faq')} 
                className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 block rounded-md px-3 py-2 text-base font-medium w-full text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleNavClick('/home#register-form')} 
                className="mt-4 bg-blue-600 text-white block rounded-md px-3 py-2 text-base font-medium text-center w-full"
              >
                Tham gia ngay
              </button>
            </div>
          </div>
        )}
      </header>
    );
  };