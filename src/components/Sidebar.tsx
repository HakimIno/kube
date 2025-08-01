// components/Sidebar.tsx
"use client";

import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useSidebarStore } from '@/store/sidebarStore';
import { sidebarItems, subscriptions } from '@/constants/sidebarData';
import { SidebarLink } from './SidebarLink';
import { twMerge } from 'tailwind-merge';

export const Sidebar = () => {
  const pathname = usePathname();
  const {
    isCollapsed,
    toggleCollapse
  } = useSidebarStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check initial screen size
    setIsMobile(window.innerWidth < 1024);

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      toggleCollapse();
    }
  }, [toggleCollapse, isMobile]);

  const asideClasses = twMerge(
    'fixed left-0 top-14  bottom-0 bg-black/80 backdrop-blur-xl border-r border-white/10 pt-4 z-[100] transition-all duration-300 ease-in-out',
    isMobile
      ? isCollapsed
        ? '-translate-x-full w-0'
        : 'translate-x-0 w-64'
      : isCollapsed
        ? 'w-18'
        : 'w-64'
  );

  const sidebarItemsSection = useMemo(() => (
    <div className="px-2 flex flex-col gap-1">
      {sidebarItems.map((item) => (
        <SidebarLink
          key={item.id}
          href={item.path}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
          isActive={pathname === item.path}
          onClick={handleLinkClick}
        />
      ))}
    </div>
  ), [isCollapsed, pathname, handleLinkClick]);

  const subscriptionsSection = useMemo(() => (
    !isCollapsed && (
      <div className="px-2 mt-8">
        <h3 className="text-sm font-semibold text-gray-400 px-4 mb-2">Subscriptions</h3>
        <div className="flex flex-col gap-1">
          {subscriptions.map((sub) => (
            <SidebarLink
              key={sub.id}
              href={`/channel/${sub.id}`}
              avatar={sub.avatar}
              label={sub.name}
              isCollapsed={isCollapsed}
              isActive={pathname === `/channel/${sub.id}`}
              onClick={handleLinkClick}
            />
          ))}
        </div>
      </div>
    )
  ), [isCollapsed, pathname, handleLinkClick]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] lg:hidden"
          onClick={toggleCollapse}
        />
      )}

      <aside className={asideClasses}>
        {sidebarItemsSection}
        {subscriptionsSection}
        <div className="absolute bottom-4 w-full">
          <button
            onClick={() => { }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex items-center justify-center w-full"
          >
            <Icon
              icon={'solar:logout-linear'}
              className="w-5 h-5 text-white"
            />
           {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};