"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebarStore';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const router = useRouter();
  const { toggleCollapse } = useSidebarStore();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showUserMenu]);

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
          {isAuthenticated ? (
            <>
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
              
              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
                >
                  <Image
                    src={user?.avatar || "/avatar-placeholder.svg"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized={user?.avatar?.includes('ui-avatars.com') || user?.avatar?.includes('example.com')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/avatar-placeholder.svg";
                    }}
                  />
                  <span className="text-sm text-white hidden sm:block">{user?.name}</span>
                  <Icon icon="solar:alt-arrow-down-linear" className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user?.avatar || "/avatar-placeholder.svg"}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="rounded-full"
                          unoptimized={user?.avatar?.includes('ui-avatars.com') || user?.avatar?.includes('example.com')}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/avatar-placeholder.svg";
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      โปรไฟล์
                    </button>
                    <button
                      onClick={() => router.push('/settings')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      การตั้งค่า
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={async () => {
                        try {
                          await logout();
                          setShowUserMenu(false);
                          router.push('/auth/login');
                        } catch (error) {
                          console.error('Logout error:', error);
                          // Still redirect to login even if logout fails
                          setShowUserMenu(false);
                          router.push('/auth/login');
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button 
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}; 