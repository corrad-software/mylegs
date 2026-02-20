import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface BookmarkItem {
  id: string;
  title: string;
  subtitle?: string; // e.g. "Federal Constitution"
  type: 'statute' | 'caselaw' | 'topic';
  url?: string;
  dateAdded: number;
}

export interface Folder {
  id: string;
  name: string;
  items: string[]; // array of bookmark IDs
}

interface BinderContextType {
  bookmarks: BookmarkItem[];
  folders: Folder[];
  toggleBookmark: (item: Omit<BookmarkItem, 'dateAdded'>) => void;
  isBookmarked: (id: string) => boolean;
  createFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
}

const BinderContext = createContext<BinderContextType | undefined>(undefined);

export const BinderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('mylegs-binder-bookmarks');
    const savedFolders = localStorage.getItem('mylegs-binder-folders');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedFolders) setFolders(JSON.parse(savedFolders));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('mylegs-binder-bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('mylegs-binder-folders', JSON.stringify(folders));
  }, [bookmarks, folders]);

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

  const toggleBookmark = (item: Omit<BookmarkItem, 'dateAdded'>) => {
    if (isBookmarked(item.id)) {
      setBookmarks(prev => prev.filter(b => b.id !== item.id));
    } else {
      // --- PAYWALL LOGIC ---
      // Free users limited to 3 items
      if (user?.tierId === 'free' && bookmarks.length >= 3) {
        setShowUpgradeModal(true);
        return;
      }
      setBookmarks(prev => [{ ...item, dateAdded: Date.now() }, ...prev]);
    }
  };

  const createFolder = (name: string) => {
    if (user?.tierId === 'free') {
      setShowUpgradeModal(true);
      return;
    }
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      items: []
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const deleteFolder = (id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id));
  };

  return (
    <BinderContext.Provider value={{ 
      bookmarks, 
      folders, 
      toggleBookmark, 
      isBookmarked, 
      createFolder, 
      deleteFolder,
      showUpgradeModal, 
      setShowUpgradeModal 
    }}>
      {children}
    </BinderContext.Provider>
  );
};

export const useBinder = () => {
  const context = useContext(BinderContext);
  if (!context) throw new Error('useBinder must be used within a BinderProvider');
  return context;
};