'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Role, BuyerType, Theme } from '@/types';

interface AppContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  role: Role | null;
  setRole: (r: Role | null) => void;
  buyerType: BuyerType | null;
  setBuyerType: (b: BuyerType | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (c: boolean) => void;
  hydrated: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  theme: 'harvestlink-theme',
  role: 'harvestlink-role',
  buyerType: 'harvestlink-buyer-type',
  sidebarCollapsed: 'harvestlink-sidebar-collapsed',
};

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function storeValue(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [theme, setThemeState] = useState<Theme>('system');
  const [role, setRoleState] = useState<Role | null>(null);
  const [buyerType, setBuyerTypeState] = useState<BuyerType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    setThemeState(getStoredValue<Theme>(STORAGE_KEYS.theme, 'system'));
    setRoleState(getStoredValue<Role | null>(STORAGE_KEYS.role, null));
    setBuyerTypeState(getStoredValue<BuyerType | null>(STORAGE_KEYS.buyerType, null));
    setSidebarCollapsedState(
      getStoredValue<boolean>(STORAGE_KEYS.sidebarCollapsed, false)
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    storeValue(STORAGE_KEYS.theme, t);
  }, []);

  const setRole = useCallback((r: Role | null) => {
    setRoleState(r);
    storeValue(STORAGE_KEYS.role, r);
  }, []);

  const setBuyerType = useCallback((b: BuyerType | null) => {
    setBuyerTypeState(b);
    storeValue(STORAGE_KEYS.buyerType, b);
  }, []);

  const setSidebarCollapsed = useCallback((c: boolean) => {
    setSidebarCollapsedState(c);
    storeValue(STORAGE_KEYS.sidebarCollapsed, c);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        role,
        setRole,
        buyerType,
        setBuyerType,
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        hydrated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
