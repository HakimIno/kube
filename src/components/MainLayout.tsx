"use client";

import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BackgroundElements } from './BackgroundElements';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Sidebar />
      <main className="relative max-w-full mx-auto px-2 sm:px-4 lg:px-6 pl-2 sm:pl-4 lg:pl-24 pt-12 lg:pt-14">
        <div className="min-h-[calc(100vh-5rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}; 