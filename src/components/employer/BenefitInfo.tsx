import { POLICY } from '@/constants/policy';
import styled from 'styled-components';
import Line from '@/components/common/Line';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import Icon from '@/icons/Icon';

export default function BenefitInfo() {
  const router = useRouter();

  return (
    <S.BenefitInfo>
      <div className="item">
        <h6 className="item__title">채용상품</h6>
        <p className="item__text product" onClick={() => router.push(path.EMPLOYER_PRODUCT_RECRUITMENT)}>
          채용을 도와주는 상품
          <Icon name="ArrowRight16x16" width="14px" height="16px" margin="0 0 0 3px" />
        </p>
      </div>
      <Line margin="0" />
      <div className="item">
        <h6 className="item__title">고객센터</h6>
        <p className="item__text">{POLICY.email}</p>
      </div>
    </S.BenefitInfo>
  );
}

const S = {
  BenefitInfo: styled.div`
    flex-basis: 500px;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__title {
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__text {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.black600};
        user-select: text;
      }
      .product {
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.black100};
        }
      }
    }
  `,
};
