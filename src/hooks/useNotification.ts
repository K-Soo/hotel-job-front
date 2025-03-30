import React from 'react';
import { io } from 'socket.io-client';
import useAuth from '@/hooks/useAuth';
import environment from '@/environment';

const SOCKET_SERVER_URL = environment.apiUrl + '/notification';

type UnreadStatusData = { status: 'unread_exist' | 'all_read' };

export default function useNotification() {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const socketInstance = io(SOCKET_SERVER_URL, {
      reconnectionDelay: 5000,
      reconnectionAttempts: 3,
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.info(`✅ 알림 웹소켓 연결됨`);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('웹소켓 에러:', error?.message);
    });

    socketInstance.on('unreadStatus', (data: UnreadStatusData) => {
      console.info('알림 상태:', data);
      // setNotificationStatus(data);
    });

    socketInstance.on('newNotification', (data) => {
      console.info('인앱 알림 수신!!:', data);
      // setNotificationStatus((prev) => (prev.status === 'all_read' ? { status: 'unread_exist' } : prev));
    });

    socketInstance.on('disconnect', () => {
      console.info('웹소켓 연결 종료');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated]);

  return null;
}
