import React from 'react';
import { fetchToken, messaging } from '@/lib/firebase-client';
import { onMessage } from 'firebase/messaging';
import { Post } from '@/apis';
import { appAtom } from '@/recoil/app';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

async function requestNotificationPermissionAndToken() {
  if (!('Notification' in window)) {
    console.info('This browser does not support desktop notification');
    return null;
  }

  // 권한이 이미 부여 된 경우
  if (Notification.permission === 'granted') {
    return await fetchToken();
  }

  //권한을 요청한다음에 요청(이직 알림설정 선택 안한경우)
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await fetchToken();
    }
  }
}

export default function useRequestFCMPermission() {
  const [notificationPermissionStatus, setNotificationPermissionStatus] = React.useState<NotificationPermission | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const appAtomValue = useRecoilValue(appAtom);

  const isLoading = React.useRef(false);
  const retryLoadToken = React.useRef(0);

  const router = useRouter();

  // const isEligiblePath = router.pathname === '/' || router.pathname === '/employer';

  React.useEffect(() => {
    async function initialize() {
      // IOS PWA(safari, chrome) 지원
      if (!('Notification' in window)) {
        console.info('알림 지원 브라우저가 아님');
        return;
      }

      // PROD ios(safari, chrome)지원
      if (!('serviceWorker' in navigator)) {
        console.info('서비스 워커를 지원하지 않음');
        return;
      }

      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        console.info('클라이언트 환경이 아님');
        return;
      }

      if (isLoading.current) return;

      isLoading.current = true;
      const token = await requestNotificationPermissionAndToken();

      if (Notification.permission === 'denied') {
        setNotificationPermissionStatus('denied');
        console.info('permission denied');
        isLoading.current = false;
        return;
      }

      if (!token) {
        if (retryLoadToken.current >= 3) {
          console.info('unable to load token after 3 retries');
          isLoading.current = false;
          return;
        }

        retryLoadToken.current += 1;
        console.error('Retrying...');
        isLoading.current = false;
        await initialize();
        return;
      }

      setNotificationPermissionStatus(Notification.permission);
      setToken(token);
      isLoading.current = false;

      try {
        // FCM 전송
        const response = await Post.saveFcmToken({ token, isPWA: appAtomValue.isPWA });
        console.log('FCM API : ', response);
      } catch (error: any) {
        console.error('FCM 토큰저장 error: ', error?.message);
      }
    }

    if (isAuthenticated) {
      initialize();
    }
  }, [appAtomValue.isPWA, isAuthenticated]);

  // Foreground 푸시 알림 리스너 등록
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!token) return;

    const setupListener = async () => {
      const getMessaging = await messaging();
      if (!getMessaging) return;

      console.info('✅ Foreground 푸시 알림 리스너 등록됨');
      const unsubscribe = onMessage(getMessaging, (payload) => {
        console.log('Foreground 푸시 알림 수신:', payload);

        // alert(JSON.stringify(payload));

        if (Notification.permission !== 'granted') {
          console.info('알림 표시 권한 없음.');
          return;
        }

        const link = payload.fcmOptions?.link || payload.data?.link;

        const toastMessage = `${payload.notification?.body}`;

        if (link) {
          toast.info(toastMessage, {
            action: {
              label: '확인',
              onClick: () => {
                const link = payload.fcmOptions?.link || payload.data?.link;
                if (link) {
                  router.push(link);
                }
              },
            },
          });
        } else {
          toast.info(toastMessage);
        }

        // --------------------------------------------
        // iOS Safari PWA에서는 Notification API를 사용할 수 없음(백그라운드 상태일 때만 표시됨)
        // const notification = new Notification(payload.notification?.title || '새로운 메세지', {
        //   body: payload.notification?.body || '',
        //   data: link ? { url: link } : undefined,
        //   icon: '/icons/icon-192x192.png',
        // });

        // notification.onclick = (event) => {
        //   event.preventDefault();
        //   const link = (event.target as any)?.data?.url;
        //   if (link) {
        //     router.push(link);
        //   }
        // };
        // --------------------------------------------
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { notificationPermissionStatus, token };
}
