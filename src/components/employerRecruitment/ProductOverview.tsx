import { RecruitmentItem, RecruitmentStatusKeys } from '@/types';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_OPTION_NAME } from '@/constants/product';
import { dateFormat } from '@/utils';
interface ProductOverviewProps {
  item: RecruitmentItem;
}

export default function ProductOverview({ item }: ProductOverviewProps) {
  const router = useRouter();

  return (
    <S.ProductOverview>
      {item.recruitmentStatus === 'PROGRESS' && item.paymentRecruitment && (
        <S.Progress>
          <div className="content">
            <span>{RECRUITMENT_PRODUCT_NAME[item.paymentRecruitment.name]}상품</span>
            {' | '}
            {item.postingEndDate && <span>{dateFormat.date(item.postingEndDate, 'YY.MM.DD')} 마감</span>}
          </div>
          {item.paymentRecruitment.options.map((option) => (
            <span className="option" key={option.id}>
              {RECRUITMENT_PRODUCT_OPTION_NAME[option.name]}
            </span>
          ))}
        </S.Progress>
      )}

      {item.recruitmentStatus === 'PUBLISHED' && (
        <S.Published>
          <Button
            label="상품 신청"
            variant="secondary100"
            width="60px"
            height="25px"
            fontSize="12px"
            onClick={() => router.push(path.EMPLOYER_PRODUCT_RECRUITMENT)}
          />
        </S.Published>
      )}

      {item.recruitmentStatus === 'CLOSED' && <S.Closed>마감된 공고</S.Closed>}

      {item.recruitmentStatus === 'REVIEWING' && <S.Reviewing>확인중</S.Reviewing>}

      {item.recruitmentStatus === 'DRAFT' && <S.Draft>-</S.Draft>}
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
      padding-right: 3px;
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
