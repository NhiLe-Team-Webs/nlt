import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const TermsOfUse = () => {
  const handleNavigate = (target: string, href?: string) => {
    if (href && href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="text-lg text-gray-700 mb-4">
          This is the Terms of Use page. Here you can include details about the terms and conditions for using your website or service.
        </p>
        <p className="text-lg text-gray-700">
          Please replace this placeholder content with your actual terms of use.
        </p>
      </main>
      <Footer onNavigate={(target, href) => { 
        if (href) {
          window.location.href = href;
        }
      }} />
    </div>
  );
};

export default TermsOfUse;
