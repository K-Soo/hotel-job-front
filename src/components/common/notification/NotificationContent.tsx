import React from 'react';
import styled from 'styled-components';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Get } from '@/apis';
import SkeletonUI from '@/components/common/SkeletonUI';
import queryKeys from '@/constants/queryKeys';
import EmptyComponent from '@/components/common/EmptyComponent';
import { ErrorComponent } from '@/error';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { keepPreviousData } from '@tanstack/react-query';
import NotificationItem from '@/components/common/notification/NotificationItem';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouter } from 'next/router';
import { useNotificationContext } from '@/context/NotificationProvider';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';

interface NotificationContentProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NotificationContent({ isOpen, setIsOpen }: NotificationContentProps) {
  const router = useRouter();

  const { notificationStatus } = useNotificationContext();

  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetching, isError, isFetchingNextPage, refetch } = useInfiniteScroll({
    queryFn: Get.getNotificationList,
    queryKey: [queryKeys.NOTIFICATION_LIST],
    options: {
      throwOnError: false,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      limit: '10',
    },
  });

  console.log('알림목록 API : ', data);

  React.useEffect(() => {
    if (!isOpen) return;

    if (notificationStatus.status === 'unread_exist') {
      refetch();
    }
  }, [notificationStatus, isOpen, refetch]);

  const handleClickNotification = React.useCallback((link: string) => {
    if (!link) {
      return;
    }
    setIsOpen(false);
    router.push(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFirstPage = data?.pages.at(-1)?.result.pagination.currentPage === 1;

  console.log('isFirstPage: ', isFirstPage);

  const isEmptyFirstPage = isFirstPage && data?.pages[0]?.result.items.length === 0;

  if (isLoading) {
    return (
      <div style={{ padding: '5px' }}>
        <SkeletonUI.Line style={{ height: '120px', marginBottom: '15px' }} />
        <SkeletonUI.Line style={{ height: '120px', marginBottom: '15px' }} />
        <SkeletonUI.Line style={{ height: '120px' }} />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent visibleBackButton={false} height="100%" padding="0" message="" />;
  }

  if (isEmptyFirstPage) {
    return <EmptyComponent message="알림이 없어요." height="100%" />;
  }

  if (isSuccess && data) {
    return (
      <>
        <InfiniteScroll
          loadMore={() => {
            if (!isFirstPage) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage && !isFetching}
          threshold={450}
          useWindow={false}
        >
          <S.NotificationContent id="notification-scroll">
            {data.pages.map((page) => {
              return page.result.items.map((item) => (
                <NotificationItem key={item.id} item={item} handleClickNotification={handleClickNotification} />
              ));
            })}
          </S.NotificationContent>

          {isFirstPage && hasNextPage && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 50px 0' }}>
              <Button
                label="알림 더보기"
                variant="tertiary"
                width="120px"
                height="40px"
                icon={<Icon name="ArrowRight16x16" width="16px" height="16px" margin="0 0 0 2px" />}
                borderRadius="8px"
                fontSize="14px"
                onClick={() => fetchNextPage()}
              />
            </div>
          )}

          {isFetchingNextPage && <LoadingSpinner height="100px" />}
        </InfiniteScroll>
      </>
    );
  }
}

const S = {
  NotificationContent: styled.div`
    height: 100%;
  `,
};
