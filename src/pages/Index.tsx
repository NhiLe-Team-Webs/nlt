import { useState } from 'react';
import { Header } from '../components/Header';
import { HomePage } from '../components/HomePage';
import { Footer } from '../components/Footer';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (target: string, href?: string) => {
    setCurrentPage(target);
    
    if (target === 'home' && href && href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Trang {currentPage}</h1>
              <p className="text-xl text-muted-foreground">Đang phát triển...</p>
              <button 
                onClick={() => handleNavigate('home')}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNavigate={handleNavigate} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer onNavigate={(target, href) => {
        if (href) {
          window.location.href = href;
        }
      }}/>
    </div>
  );
};

export default Index;
