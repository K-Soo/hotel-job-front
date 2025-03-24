import { EmployerCouponListItem } from '@/types';
import styled from 'styled-components';
import Radio from '@/components/common/style/Radio';
import { dateFormat, priceComma } from '@/utils';
import { motion } from 'framer-motion';
import Dimmed from '@/components/common/Dimmed';

interface CouponCardProps {
  item: EmployerCouponListItem;
  selectedCoupon: string | null;
  isUsed: boolean;
  handleChangedCoupon: (value: string) => void;
}

export default function CouponCard({ item, selectedCoupon, handleChangedCoupon, isUsed = false }: CouponCardProps) {
  return (
    <S.CouponCard
      $isUsed={isUsed}
      onClick={() => {
        if (isUsed) return;
        handleChangedCoupon(item.id);
      }}
      whileTap={{ scale: isUsed ? 1 : 0.99 }}
    >
      <StyledCircle />
      {isUsed && <Dimmed text={item.reason} />}

      <S.MainContent>
        <p className="description">{item.description}</p>

        {item.discountType === 'FIXED' && <strong className="discountAmount">{priceComma(item.discountAmount)}원 할인</strong>}

        <div className="info-box">
          {item.minOrderAmount > 0 && <span>최소 주문 금액 {priceComma(item.minOrderAmount)}원</span>}
          {item.expiresAt && <span className="info-box__date">{dateFormat.date(item.expiresAt, 'YYYY.MM.DD')}까지</span>}
          {!item.expiresAt && <span className="info-box__date">유효기간 없음</span>}
        </div>
      </S.MainContent>

      <S.SideContent>
        {!isUsed && (
          <Radio checked={selectedCoupon === item.id} name="coupon" onChange={() => handleChangedCoupon(item.id)} value={item.id} />
        )}
        <span className="text">COUPON</span>
      </S.SideContent>
    </S.CouponCard>
  );
}

const StyledCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -10px;
  z-index: 2;
  background-color: #fff;
`;

const S = {
  CouponCard: styled(motion.div)<{ $isUsed: boolean }>`
    position: relative;
    height: 150px;
    border-radius: 5px;
    width: 100%;
    user-select: text;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    cursor: ${({ $isUsed }) => ($isUsed ? 'not-allowed' : 'pointer')};
    border: none;
    margin-bottom: 15px;
    background: ${({ $isUsed }) =>
      $isUsed ? 'linear-gradient(to right, #bcbcbc, #bcbcbc)' : 'linear-gradient(to right, #1b64da, #4593fc)'};
  `,
  MainContent: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    padding: 40px 0 20px 0;
    .description {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.2;
      white-space: pre-line;
    }
    .discountAmount {
      flex: 1;
      font-size: 24px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    .info-box {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray200};
      span {
        padding: 0 5px;
      }
    }
  `,
  SideContent: styled.div`
    width: 80px;
    display: flex;
    align-items: start;
    justify-content: flex-end;
    padding: 10px;
    position: relative;
    background: linear-gradient(to bottom, transparent 50%, #ffffff 50%);
    background-size: 2px 10px;
    background-repeat: repeat-y;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: 1px;
      color: #fff;
      writing-mode: vertical-lr;
      font-size: 10px;
      font-weight: 300;
    }
  `,
};
