import React from 'react';
import { firebaseMessaging } from '@/lib/firebase-client';
import { getToken } from 'firebase/messaging';
import environment from '@/environment';
import { Post } from '@/apis';
import useAuth from '@/hooks/useAuth';
import { appAtom } from '@/recoil/app';
import { useRecoilValue } from 'recoil';
// 1. 알림 권한을 확인
async function permissionGranted(): Promise<boolean> {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// 2. FCM 토큰 요청
async function getFcmToken(): Promise<string> {
  try {
    const messaging = firebaseMessaging();

    const token = await getToken(messaging, {
      vapidKey: environment.vapiKey,
    });

    if (!token) {
      throw new Error('FCM 토큰을 가져올 수 없습니다.');
    }
    return token;
  } catch (error) {
    throw error;
  }
}

interface FCMPermissionProps {
  isAuthenticated: boolean;
}

export default function useRequestFCMPermission({ isAuthenticated }: FCMPermissionProps) {
  const appAtomValue = useRecoilValue(appAtom);

  React.useEffect(() => {
    async function initializeFCM() {
      if (!isAuthenticated) {
        return;
      }

      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        console.warn('클라이언트 환경이 아님');
        return;
      }

      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.warn('브라우저가 푸시 알림을 지원하지 않음');
        return;
      }

      console.log('✅ 푸시 알림 지원 브라우저');

      try {
        // 푸시 권한 확인
        const hasPermission = await permissionGranted();

        if (!hasPermission) {
          console.warn('🚫 푸시 권한이 거부됨');
          return;
        }

        const token = await getFcmToken();

        // FCM 전송
        const response = await Post.saveFcmToken({ token, isPWA: appAtomValue.isPWA });
        console.log('FCM API : ', response);
      } catch (error: any) {
        console.log('error: ', error?.message);
      }
    }

    initializeFCM();
    // appAtomValue.isPWA
  }, [isAuthenticated]);
}
