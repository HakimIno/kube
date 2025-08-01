"use client";

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import React from 'react';

interface SidebarLinkProps {
  href: string;
  icon?: string;
  avatar?: string;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export const SidebarLink = React.memo(({
  href,
  icon,
  avatar,
  label,
  isCollapsed,
  isActive,
  onClick
}: SidebarLinkProps) => {
  const router = useRouter();
  const linkClasses = twMerge(
    'w-full flex items-center gap-4 px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer',
    isActive
      ? 'bg-white/10 text-white'
      : 'text-gray-400 hover:bg-white/10 hover:text-white'
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    router.push(href, { scroll: false });
  };

  return (
    <Link 
      href={href} 
      className={linkClasses} 
      onClick={handleClick}
      prefetch={true}
      shallow={true}
    >
      {icon && <Icon icon={icon} className="w-6 h-6 " />}
      {avatar && (
        <img
          src={avatar}
          alt={label}
          className="w-6 h-6 rounded-full flex-shrink-0"
        />
      )}
      {!isCollapsed && <span className="text-sm truncate">{label}</span>}
    </Link>
  );
}); 