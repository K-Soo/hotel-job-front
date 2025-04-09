import React from 'react';
import { UAParser } from 'ua-parser-js';
import { useAppStore } from '@/store/useAppStore';
import { isStandalonePWA } from 'ua-parser-js/helpers';

export default function useApp() {
  const setAppInfo = useAppStore((state) => state.setAppInfo);

  React.useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setAppInfo({
      isPWA: isStandalonePWA(),
      browser: result?.browser?.name,
      os: result?.os?.name,
      device: result?.device?.type,
      engine: result?.engine?.name,
    });
  }, [setAppInfo]);
}
