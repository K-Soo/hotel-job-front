import environment from '@/environment';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: environment.apiKey,
  authDomain: environment.authDomain,
  projectId: environment.projectId,
  storageBucket: environment.storageBucket,
  messagingSenderId: environment.messagingSenderId,
  appId: environment.appId,
};

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseMessaging = () => getMessaging(firebaseApp);

export { firebaseApp, firebaseMessaging };
