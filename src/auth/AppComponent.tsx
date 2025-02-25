import React from 'react';
import useAuth from '@/hooks/useAuth';
import { UAParser } from 'ua-parser-js';
import useRequestFCMPermission from '@/hooks/useRequestFCMPermission';
import { isStandalonePWA } from 'ua-parser-js/helpers';
import { appAtom } from '@/recoil/app';
import { useSetRecoilState, useRecoilState } from 'recoil';

export default function AppComponent() {
  const [appAtomState, setAppAtomState] = useRecoilState(appAtom);
  const { isAuthenticated } = useAuth();

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

  console.log('appAtomState: ', appAtomState);

  const { notificationPermissionStatus, token } = useRequestFCMPermission({ isAuthenticated });

  return (
    <div>
      <p>{JSON.stringify(notificationPermissionStatus)}</p>
      <p>{JSON.stringify(token)}</p>
    </div>
  );
}
