import React from 'react';
import styled from 'styled-components';
import { useNotificationContext } from '@/context/NotificationProvider';
import Icon from '@/icons/Icon';
import useAuth from '@/hooks/useAuth';
import IconHover from '@/components/common/IconHover';
import Modal from '@/components/common/modal';
import dynamic from 'next/dynamic';
import useResponsive from '@/hooks/useResponsive';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import SkeletonUI from '@/components/common/SkeletonUI';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });
const DynamicNoSSRNotificationContent = dynamic(() => import('@/components/common/notification/NotificationContent'), { ssr: false });

interface NotificationProps {
  margin?: string;
}

export default function Notification({ margin }: NotificationProps) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const { notificationStatus, socket } = useNotificationContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const { isTablet } = useResponsive();

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    if (notificationStatus.status === 'all_read') return;

    if (socket) {
      console.log('markNotificationsAsRead Emit 전송');
      socket.emit('markNotificationsAsRead');
    }
  }, [isOpen, notificationStatus.status, socket]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(dropdownRef.current && notificationRef.current)) {
        return;
      }

      if (!dropdownRef.current.contains(event.target as Node) && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isAuthLoading) {
    return <SkeletonUI.Icon margin={margin} />;
  }

  if (isAuthenticated) {
    return (
      <>
        {isTablet && isOpen && (
          <DynamicNoSSRModal handleCloseModal={() => setIsOpen(false)}>
            <Modal.Header title="알림" handleCloseModal={() => setIsOpen(false)} />
            <Modal.Content padding="0">
              <DynamicNoSSRNotificationContent setIsOpen={setIsOpen} isOpen={isOpen} />
            </Modal.Content>
          </DynamicNoSSRModal>
        )}

        <S.Notification $margin={margin} ref={notificationRef} tabIndex={0}>
          <IconHover width="40px" height="40px" onClick={() => setIsOpen((prev) => !prev)}>
            {notificationStatus.status === 'unread_exist' && <S.ReadMark />}
            <Icon name="SolarBell24x24" width="24px" height="24px" />
          </IconHover>

          {isOpen && !isTablet && (
            <DropdownTemplate ref={dropdownRef} outStyle={{ width: '380px', right: '0', paddingTop: '20px' }}>
              <DynamicNoSSRNotificationContent setIsOpen={setIsOpen} isOpen={isOpen} />
            </DropdownTemplate>
          )}
        </S.Notification>
      </>
    );
  }

  return null;
}

const S = {
  Notification: styled.div<{ $margin?: string }>`
    position: relative;
    margin: ${(props) => props.$margin};
  `,
  ReadMark: styled.span`
    position: absolute;
    top: 7px;
    right: 7px;
    border-radius: 50%;
    font-size: 10px;
    background-color: ${(props) => props.theme.colors.red400};
    width: 5px;
    height: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
  `,
};
