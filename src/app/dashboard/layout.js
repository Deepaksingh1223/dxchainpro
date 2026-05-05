"use client";

import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardHeader';  // NEXARB Sidebar
import DashboardTopbar from '../components/DashboardSidebar'; // NEXARB Topbar
import DashboardPage from './page'; // Main content
// Dashboard CSS now loaded globally in root layout.js - /assets/css/dashboard.css
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/dashboard.css" />
         {/* <link rel="stylesheet" href="/assets/css/dashboard1.css" /> */}
      {/* NEXARB BACKGROUND SYSTEM */}
      <div className="bg-mesh">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="grid-bg"></div>
      <div id="pts"></div>

      {/* MAIN LAYOUT */}
      <div className="layout">
        {/* NEXARB SIDEBAR */}
        <DashboardSidebar mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} /> 
        
        {/* MAIN + TOPBAR */}
        <div className="main"> 
          <DashboardTopbar theme={theme} toggleTheme={toggleTheme} mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} /> 
          <main className="content">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
