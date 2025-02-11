import styled from 'styled-components';

interface CouponTabProps {}

export default function CouponTab({}: CouponTabProps) {
  return (
    <S.CouponTab>
      <div>
        <button>사용가능한 쿠폰</button>
      </div>
    </S.CouponTab>
  );
}

const S = {
  CouponTab: styled.div`
    font-size: 18px;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black400};
    margin-bottom: 15px;
  `,
};
