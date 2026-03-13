import React from 'react';
import DashboardRoute from './DashboardRoute';

const DashboardLayout: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <DashboardRoute />
    </div>
  );
};

export default DashboardLayout;