export interface SidebarItem {
  id: string;
  icon: string;
  label: string;
  path: string;
}

export interface Subscription {
  id: string;
  name: string;
  avatar: string;
}

export const sidebarItems: SidebarItem[] = [
  { id: 'home', icon: 'solar:home-2-linear', label: 'Home', path: '/' },
  { id: 'explore', icon: 'solar:compass-linear', label: 'Explore', path: '/explore' },
  { id: 'subscriptions', icon: 'solar:playlist-linear', label: 'Subscriptions', path: '/subscriptions' },
  { id: 'library', icon: 'solar:library-linear', label: 'Library', path: '/library' },
  { id: 'history', icon: 'solar:clock-circle-linear', label: 'History', path: '/history' },
  { id: 'watch-later', icon: 'solar:clock-square-linear', label: 'Watch later', path: '/watch-later' },
  { id: 'liked', icon: 'solar:like-linear', label: 'Liked videos', path: '/liked' },
];

export const subscriptions: Subscription[] = [
          { id: '1', name: 'Channel 1', avatar: '/avatar-placeholder.svg' },
        { id: '2', name: 'Channel 2', avatar: '/avatar-placeholder.svg' },
        { id: '3', name: 'Channel 3', avatar: '/avatar-placeholder.svg' },
]; 