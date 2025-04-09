import { create } from 'zustand';

export interface AppStoreState {
  isPWA: boolean;
  browser?: string; //'Mobile Safari' | 'Mobile Chrome' | 'Chrome' | 'Safari' ;
  os?: string; //'iOS' | 'Android' | 'macOS' | 'Windows' | 'Chromecast Linux' ;
  device?: string; // 'mobile' | 'tablet' | 'smarttv' | undefined;
  engine?: string; // 'WebKit' | 'Blink' ;
  setAppInfo: (info: Partial<AppStoreState>) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  isPWA: false,
  browser: undefined,
  os: undefined,
  device: undefined,
  engine: undefined,
  setAppInfo: (info) => set((state) => ({ ...state, ...info })),
}));
