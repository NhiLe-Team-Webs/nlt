import { useEffect } from 'react';
import { Header } from '../components/Header';
import { HomePage } from '../components/HomePage';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        // Cuộn mượt đến phần tử mà không bị header che
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleNavigate = (target: string, href?: string) => {
    if (href) {
      window.location.href = href;
    } else {
      navigate(target);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;