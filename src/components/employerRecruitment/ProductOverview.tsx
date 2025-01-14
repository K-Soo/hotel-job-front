import { RecruitmentStatusKeys } from '@/types';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';

interface ProductOverviewProps {
  status: RecruitmentStatusKeys;
}

export default function ProductOverview({ status }: ProductOverviewProps) {
  return (
    <S.ProductOverview>
      {status === 'PROGRESS' && (
        <S.Progress>
          <div className="content">프리미엄(메인) | 2024.12.31 마감</div>
          <div className="option">끌어올림 | 형광펜 | 태그</div>
        </S.Progress>
      )}

      {status === 'PUBLISHED' && (
        <S.Published>
          <Button label="상품 신청" variant="secondary100" width="60px" height="25px" fontSize="12px" />
        </S.Published>
      )}

      {status === 'CLOSED' && <S.Closed>마감된 공고</S.Closed>}

      {status === 'REVIEWING' && <S.Reviewing>확인중</S.Reviewing>}

      {status === 'DRAFT' && <S.Draft>-</S.Draft>}
    </S.ProductOverview>
  );
}

const S = {
  ProductOverview: styled.div`
    user-select: none;
  `,
  Progress: styled.div`
    .content {
      font-size: 13px;
      color: ${(props) => props.theme.colors.black300};
    }
    .option {
      padding-top: 3px;
      font-size: 11px;
      color: ${(props) => props.theme.colors.gray700};
    }
  `,
  Published: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      font-size: 12px;
    }
  `,
  Closed: styled.div``,
  Draft: styled.div`
    color: ${(props) => props.theme.colors.gray700};
  `,
  Reviewing: styled.div``,
};
