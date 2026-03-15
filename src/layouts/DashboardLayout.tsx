import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface DashboardLayoutProps {
  onNavigate?: (target: string, href?: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default DashboardLayout;