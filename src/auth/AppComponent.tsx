import React from 'react';
import useAuth from '@/hooks/useAuth';
import { UAParser } from 'ua-parser-js';
import useRequestFCMPermission from '@/hooks/useRequestFCMPermission';
import { isStandalonePWA } from 'ua-parser-js/helpers';
import { appAtom } from '@/recoil/app';
import { useSetRecoilState } from 'recoil';

export default function AppComponent() {
  const setAtomApp = useSetRecoilState(appAtom);
  const { isAuthenticated } = useAuth();

  // TODO : FCM 토큰 요청 로그인으로
  React.useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setAtomApp({
      isPWA: isStandalonePWA(),
      browser: result?.browser?.name ?? undefined,
      os: result?.os?.name ?? undefined,
      device: result?.device?.type ?? undefined,
      engine: result?.engine?.name ?? undefined,
    });
  }, []);

  useRequestFCMPermission({ isAuthenticated });

  return <></>;
}
