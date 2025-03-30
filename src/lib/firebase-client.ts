import environment from '@/environment';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, isSupported, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export async function fetchToken() {
  try {
    const fcmMessaging = await messaging();

    if (!fcmMessaging) {
      throw new Error('is not supported');
    }

    const token = await getToken(fcmMessaging, { vapidKey: environment.vapiKey });
    if (!token) {
      throw new Error('token is not exist');
    }
    return token;
  } catch (error: any) {
    console.error('An error occurred while fetching the token:', error?.message);
    return null;
  }
}

export { app, messaging };
