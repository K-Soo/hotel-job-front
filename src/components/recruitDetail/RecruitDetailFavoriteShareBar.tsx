import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import useShare from '@/hooks/useShare';

export default function RecruitDetailFavoriteShareBar() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // TODO - 공유하기 로직 추가
  const { handleClickShare } = useShare({
    title: 'title',
  });

  // TODO - 북마크 로직 추가
  const handleClickBookmark = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
      return addToast({ message: '로그인 후 북마크 기능을 이용해 보세요! 😊', type: 'info' });
    }
    // 북마크에 추가되었습니다! 😄
  };
  return (
    <S.RecruitDetailFavoriteShareBar>
      <IconDimmed width="36px" height="36px" margin="0 15px 0 0" onClick={handleClickBookmark}>
        <Icon name="Bookmark24x24" height="24px" width="24px" />
      </IconDimmed>
      <IconDimmed width="36px" height="36px" onClick={handleClickShare}>
        <Icon name="Share24x24" height="24px" width="24px" />
      </IconDimmed>
    </S.RecruitDetailFavoriteShareBar>
  );
}

const S = {
  RecruitDetailFavoriteShareBar: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    svg {
      color: #999;
    }
  `,
};
