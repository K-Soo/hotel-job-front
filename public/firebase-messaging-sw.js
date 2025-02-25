importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBUK1DafcLVaE9O0pLOyF28oTrqTGwGisI',
  authDomain: 'hotel-job-41787.firebaseapp.com"',
  projectId: 'hotel-job-41787',
  storageBucket: 'hotel-job-41787.firebasestorage.app',
  messagingSenderId: '1096073443624',
  appId: '1:1096073443624:web:ca7d1c90030b2ba7e4381d',
});

const messaging = firebase.messaging();
console.log('!!: ', messaging);

messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 푸시 알림 수신: ', payload);
  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
    data: {
      url: link,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('notificationclick 이벤트 발생: ', event);
  event.notification.close();

  const url = event.notification.data.url;
  event.waitUntil(clients.openWindow(url));
});
