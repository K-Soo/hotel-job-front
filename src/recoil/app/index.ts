import { atom } from 'recoil';

export interface AppAtom {
  isPWA: boolean;
  browser?: string | undefined; //'Mobile Safari' | 'Mobile Chrome' | 'Chrome' | 'Safari' ;
  os?: string | undefined; //'iOS' | 'Android' | 'macOS' | 'Windows' | 'Chromecast Linux' ;
  device?: string | undefined; // 'mobile' | 'tablet' | 'smarttv' | undefined;
  engine?: string | undefined; // 'WebKit' | 'Blink' ;
}

export const appAtom = atom<AppAtom>({
  key: 'appAtom',
  default: {
    isPWA: false,
    browser: undefined,
    os: undefined,
    device: undefined,
    engine: undefined,
  },
});
