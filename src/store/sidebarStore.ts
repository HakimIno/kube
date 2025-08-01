import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

// Create storage with logging
const storage = createJSONStorage(() => ({
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    console.log('Getting from localStorage:', name, value);
    return value;
  },
  setItem: (name: string, value: string) => {
    console.log('Setting to localStorage:', name, value);
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    console.log('Removing from localStorage:', name);
    localStorage.removeItem(name);
  },
}));

// Get initial state from localStorage
const getInitialState = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sidebar-storage');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.state?.isCollapsed ?? true; // Default to true (collapsed)
      } catch (e) {
        console.error('Error parsing sidebar state:', e);
      }
    }
  }
  return true; // Default to true (collapsed)
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: getInitialState(),
      toggleCollapse: () => set((state) => {
        const newState = !state.isCollapsed;
        console.log('Toggling sidebar state to:', newState);
        return { isCollapsed: newState };
      }),
    }),
    {
      name: 'sidebar-storage',
      storage,
      skipHydration: true,
    }
  )
); 