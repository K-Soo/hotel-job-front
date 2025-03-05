import React from 'react';
import { UAParser } from 'ua-parser-js';
import { isStandalonePWA } from 'ua-parser-js/helpers';
import { appAtom } from '@/recoil/app';
import { useRecoilState } from 'recoil';
import useRequestFCMPermission from '@/hooks/useRequestFCMPermission';

export default function AppComponent() {
  const [appAtomState, setAppAtomState] = useRecoilState(appAtom);

  // TODO : FCM 토큰 요청 로그인으로
  React.useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setAppAtomState({
      isPWA: isStandalonePWA(),
      browser: result?.browser?.name ?? undefined,
      os: result?.os?.name ?? undefined,
      device: result?.device?.type ?? undefined,
      engine: result?.engine?.name ?? undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { notificationPermissionStatus, token } = useRequestFCMPermission();

  return null;
}
