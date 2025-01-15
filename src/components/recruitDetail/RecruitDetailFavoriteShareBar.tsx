import styled from 'styled-components';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';

interface RecruitDetailFavoriteShareBarProps {}

export default function RecruitDetailFavoriteShareBar({}: RecruitDetailFavoriteShareBarProps) {
  return (
    <S.RecruitDetailFavoriteShareBar>
      <IconDimmed width="36px" height="36px" margin="0 15px 0 0">
        <Icon name="Bookmark24x24" height="24px" width="24px" />
      </IconDimmed>
      <IconDimmed width="36px" height="36px">
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
