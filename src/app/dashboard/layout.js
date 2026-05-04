"use client";

import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';

export default function RootLayout({ children }) {
  return (
    <div className='app' id='appShell'>
      <DashboardHeader />
      <div className='main-area'>
        <DashboardSidebar />
        <div className='scroll' id='mainScroll'>
          {children}
        </div>
      </div>
    </div>
  );
}
