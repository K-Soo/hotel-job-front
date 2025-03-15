import { RecruitmentItem, RecruitmentStatusKeys } from '@/types';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { RECRUITMENT_PRODUCT_NAME, RECRUITMENT_PRODUCT_OPTION_NAME, RECRUITMENT_PRODUCT_TYPE } from '@/constants/product';
import { dateFormat } from '@/utils';
interface ProductOverviewProps {
  item: RecruitmentItem;
}

export default function ProductOverview({ item }: ProductOverviewProps) {
  const router = useRouter();

  if (item.recruitmentStatus === 'DRAFT') {
    return null;
  }

  return (
    <S.ProductOverview>
      {item.paymentRecruitment && (item.recruitmentStatus === 'PROGRESS' || item.recruitmentStatus === 'CLOSED') && (
        <S.Progress $isClosed={item.recruitmentStatus === 'CLOSED'}>
          <div className="content">
            <div className="content__product">
              <span>{RECRUITMENT_PRODUCT_NAME[item.paymentRecruitment.name]} 채용</span>
              <span>{`(${RECRUITMENT_PRODUCT_TYPE[item.paymentRecruitment.type]})`}</span>
            </div>

            <div className="content__options">
              {item.paymentRecruitment.options.map((option) => (
                <span className="content__options--item" key={option.id}>
                  {RECRUITMENT_PRODUCT_OPTION_NAME[option.name]}
                </span>
              ))}
            </div>

            <div className="content__date">
              {item.postingStartDate && item.postingEndDate && (
                <span>
                  {dateFormat.date(item.postingStartDate, 'YY.MM.DD')} ~ {dateFormat.date(item.postingEndDate, 'YY.MM.DD')}
                </span>
              )}
            </div>
          </div>
        </S.Progress>
      )}

      {item.recruitmentStatus === 'PUBLISHED' && (
        <S.Published>
          <Button
            label="상품 신청"
            variant="secondary100"
            width="70px"
            height="30px"
            fontSize="12px"
            onClick={() => router.push(path.EMPLOYER_PRODUCT_RECRUITMENT)}
          />
        </S.Published>
      )}

      {item.recruitmentStatus === 'REVIEWING' && <S.Reviewing>확인중</S.Reviewing>}
    </S.ProductOverview>
  );
}

const S = {
  ProductOverview: styled.div``,
  Progress: styled.div<{ $isClosed: boolean }>`
    .content {
      display: flex;
      flex-direction: column;
      color: ${(props) => (props.$isClosed ? props.theme.colors.gray600 : props.theme.colors.black300)};
      &__product {
        font-size: 13px;
      }
      &__options {
        &--item {
          color: ${(props) => props.theme.colors.gray700};
          font-size: 12px;
          font-weight: 300;
          &::after {
            content: '|';
            padding: 0 3px;
          }
          &:last-child {
            &::after {
              content: '';
            }
          }
        }
      }
      &__date {
        margin-top: 2px;
        font-size: 13px;
        letter-spacing: 0.2px;
        font-weight: 300;
      }
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
  Reviewing: styled.div``,
};
