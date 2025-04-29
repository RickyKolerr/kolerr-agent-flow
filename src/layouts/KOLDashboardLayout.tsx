
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface KOLDashboardLayoutProps {
  children?: React.ReactNode;
}

const KOLDashboardLayout: React.FC<KOLDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold">KOL Dashboard</h1>
        </Card>
        <div>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default KOLDashboardLayout;
