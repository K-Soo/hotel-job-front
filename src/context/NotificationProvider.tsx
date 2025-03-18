import React from 'react';
import { createContext, useContext } from 'react';
import { Socket, io } from 'socket.io-client';
import useAuth from '@/hooks/useAuth';
import environment from '@/environment';

const SOCKET_SERVER_URL = environment.apiUrl + '/notification';

type UnreadStatusData = { status: 'unread_exist' | 'all_read' };

interface NotificationContextType {
  notificationStatus: UnreadStatusData;
  socket: Socket | null;
}

const NotificationContext = createContext<NotificationContextType>({
  notificationStatus: { status: 'all_read' },
  socket: null,
});

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  return context;
};

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [notificationStatus, setNotificationStatus] = React.useState<UnreadStatusData>({ status: 'all_read' });

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setSocket(null);
      return;
    }

    const socketInstance = io(SOCKET_SERVER_URL, {
      reconnectionDelay: 5000,
      reconnectionAttempts: 3,
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.info(`✅ 알림 웹소켓 연결됨`);
    });

    socketInstance.on('disconnect', () => {
      console.info('웹소켓 연결 종료');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('웹소켓 에러:', error?.message);
    });

    socketInstance.on('unreadStatus', (data: UnreadStatusData) => {
      console.info('알림 상태:', data);
      setNotificationStatus(data);
    });

    socketInstance.on('newNotification', (data) => {
      console.info('인앱 알림 수신!:', data);
      setNotificationStatus((prev) => (prev.status === 'all_read' ? { status: 'unread_exist' } : prev));
    });

    return () => {
      console.info('웹소켓 연결 종료');
      socketInstance.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        notificationStatus,
        socket,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
