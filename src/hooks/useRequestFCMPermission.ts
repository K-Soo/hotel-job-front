import React from 'react';
import { fetchToken, messaging } from '@/lib/firebase-client';
import { onMessage, getMessaging } from 'firebase/messaging';
import environment from '@/environment';
import { Post } from '@/apis';
import { appAtom } from '@/recoil/app';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

async function requestNotificationPermissionAndToken() {
  if (!('Notification' in window)) {
    console.info('This browser does not support desktop notification');
    return null;
  }

  // 권한이 이미 부여된경우
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

  // React.useEffect(() => {
  //   console.log('@@@@@@@@: ', Notification.permission);

  //   if (!('serviceWorker' in navigator)) {
  //     alert('서비스 워커 미지원');
  //     console.info('서비스 워커를 지원하지 않음');
  //   }

  //   if ('serviceWorker' in navigator) {
  //     // alert('서비스 워커! 지원');
  //     console.info('서비스 워커를 지원하지 않음');
  //   }

  //   // IOS PWA(safari, chrome) 지원
  //   if (!('Notification' in window)) {
  //     console.info('알림 지원 브라우저가 아님');
  //   }

  //   if (typeof window === 'undefined' || typeof navigator === 'undefined') {
  //     console.info('클라이언트 환경이 아님');
  //   }
  // }, []);

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
      } catch (error) {
        console.log('error: ', error);
      }
    }

    if (isAuthenticated) {
      initialize();
    }
  }, [appAtomValue.isPWA, isAuthenticated]);

  React.useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      const getMessaging = await messaging();
      if (!getMessaging) return;

      const unsubscribe = onMessage(getMessaging, (payload) => {
        console.log('Foreground 푸시 알림 수신:', payload);

        if (Notification.permission !== 'granted') {
          console.info('알림 표시 권한 없음.');
          return;
        }

        const link = payload.fcmOptions?.link || payload.data?.link;

        const notification = new Notification(payload.notification?.title || '새로운 메세지', {
          body: payload.notification?.body || '',
          data: link ? { url: link } : undefined,
          icon: '/icons/icon-192x192.png',
        });

        notification.onclick = (event) => {
          event.preventDefault();
          const link = (event.target as any)?.data?.url;
          if (link) {
            router.push(link);
          }
        };
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
  }, [router, token]);

  return { notificationPermissionStatus, token };
}
