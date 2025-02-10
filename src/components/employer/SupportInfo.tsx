import { EmployerAccountInfo } from '@/types';
import styled from 'styled-components';

interface SupportInfoProps {
  data: EmployerAccountInfo;
}

export default function SupportInfo({ data }: SupportInfoProps) {
  return (
    <S.SupportInfo>
      <div className="item">
        <span className="item__title">멤버십</span>
        <span className="item__content">{data.membership.membershipLevel}</span>
      </div>
      <div className="item">
        <span className="item__title">보유포인트</span>
        <span className="item__content">{data.totalPoint}P</span>
      </div>
      <div className="item">
        <span className="item__title">보유쿠폰</span>
        <span className="item__content">{3}</span>
      </div>
    </S.SupportInfo>
  );
}

const S = {
  SupportInfo: styled.div`
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__title {
        font-size: 16px;
        margin-bottom: 20px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__content {
        font-size: 24px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black500};
      }
    }
  `,
};
