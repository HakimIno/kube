"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';

export const Navbar = () => {
  const router = useRouter();
  const { toggleCollapse } = useSidebarStore();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-black/50 backdrop-blur-md z-50 border-b border-white/10">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleCollapse}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-6 h-6" />
          </button>
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-0.5 cursor-pointer"
          >
            <Icon icon="icon-park-outline:dog" className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            <span className="text-xl font-bold">kube</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-4 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full bg-white/10 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors">
              <Icon icon="solar:magnifer-linear" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors sm:hidden">
          <Icon icon="solar:magnifer-linear" className="w-6 h-6" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push('/upload')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
          >
            <Icon icon="solar:videocamera-record-linear" className="w-6 h-6" />
          </button>
          <button 
            onClick={() => router.push('/notifications')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Icon icon="solar:bell-linear" className="w-6 h-6" />
          </button>
          <button 
            onClick={() => router.push('/profile')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Image
              src="https://static-00.iconduck.com/assets.00/user-avatar-happy-icon-2048x2048-ssmbv1ou.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}; 