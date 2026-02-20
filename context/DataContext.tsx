
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TOPICS, MORE_LINKS, STATUTES } from '../constants';
import { Topic, ExternalLink, User, SubscriptionTier, Statute } from '../types';

// --- INITIAL DATA ---
const INITIAL_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic access for all students',
    moduleLimit: 3,
    features: ['First 3 Modules', 'Basic Binder (3 items)', 'Community Support'],
    colorTheme: 'slate',
    isDefault: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 12.90,
    description: 'Full semester access',
    moduleLimit: -1,
    features: ['All Modules', 'Unlimited AI Tutor', 'Smart Study Plan', 'Exam Countdown'],
    colorTheme: 'amber'
  },
  {
    id: 'plus',
    name: 'Exam Pack',
    price: 5.90,
    description: 'Essential revision tools',
    moduleLimit: 5,
    features: ['First 5 Modules', 'Past Year Questions', 'Revision Notes'],
    colorTheme: 'purple'
  }
];

const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Sarah Ahmad', email: 'sarah@student.unisza.edu.my', password: '123', tierId: 'premium', joined: '2023-10-24', status: 'Active', role: 'user' },
  { id: 'u2', name: 'John Doe', email: 'john@gmail.com', password: '123', tierId: 'free', joined: '2023-10-25', status: 'Active', role: 'user' },
  { id: 'u3', name: 'Ali Bakar', email: 'ali@unisza.edu.my', password: '123', tierId: 'plus', joined: '2023-10-25', status: 'Active', role: 'user' },
  { id: 'admin', name: 'System Admin', email: 'admin@mylegs.app', password: 'admin', tierId: 'premium', joined: '2023-01-01', status: 'Active', role: 'admin' },
];

interface AppSettings {
  appName: string;
  organization: string;
  supportEmail: string;
}

interface DataContextType {
  topics: Topic[];
  links: ExternalLink[];
  users: User[];
  settings: AppSettings;
  tiers: SubscriptionTier[];
  statutes: Statute[];
  
  // Topic Actions
  addTopic: (topic: Topic) => void;
  updateTopic: (id: string, data: Partial<Topic>) => void;
  deleteTopic: (id: string) => void;

  // Link Actions
  addLink: (link: ExternalLink) => void;
  updateLink: (id: string, data: Partial<ExternalLink>) => void;
  deleteLink: (id: string) => void;

  // User Actions
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Tier Actions
  addTier: (tier: SubscriptionTier) => void;
  updateTier: (id: string, data: Partial<SubscriptionTier>) => void;
  deleteTier: (id: string) => void;
  getTierById: (id: string) => SubscriptionTier | undefined;
  
  // Settings
  updateSettings: (data: Partial<AppSettings>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [links, setLinks] = useState<ExternalLink[]>(MORE_LINKS);
  const [statutes, setStatutes] = useState<Statute[]>(STATUTES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [tiers, setTiers] = useState<SubscriptionTier[]>(INITIAL_TIERS);
  
  const [settings, setSettings] = useState<AppSettings>({
    appName: 'MyLegS',
    organization: 'Universiti Sultan Zainal Abidin',
    supportEmail: 'support@mylegs.app'
  });

  // Data Helpers
  const getTierById = (id: string) => tiers.find(t => t.id === id) || tiers.find(t => t.isDefault);

  // CRUD Implementations
  const addTopic = (topic: Topic) => setTopics(prev => [...prev, topic]);
  const updateTopic = (id: string, data: Partial<Topic>) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };
  const deleteTopic = (id: string) => setTopics(prev => prev.filter(t => t.id !== id));

  const addLink = (link: ExternalLink) => setLinks(prev => [...prev, link]);
  const updateLink = (id: string, data: Partial<ExternalLink>) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
  };
  const deleteLink = (id: string) => setLinks(prev => prev.filter(l => l.id !== id));

  const addUser = (user: User) => setUsers(prev => [...prev, user]);
  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
  };
  const deleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));

  const addTier = (tier: SubscriptionTier) => setTiers(prev => [...prev, tier]);
  const updateTier = (id: string, data: Partial<SubscriptionTier>) => {
    setTiers(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };
  const deleteTier = (id: string) => setTiers(prev => prev.filter(t => t.id !== id));

  const updateSettings = (data: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
  };

  return (
    <DataContext.Provider value={{
      topics, links, users, settings, tiers, statutes,
      addTopic, updateTopic, deleteTopic,
      addLink, updateLink, deleteLink,
      addUser, updateUser, deleteUser,
      addTier, updateTier, deleteTier, getTierById,
      updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
