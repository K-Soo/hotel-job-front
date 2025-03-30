import { EmployerCouponListItem } from '@/types';
import styled from 'styled-components';
import { priceComma, dateFormat } from '@/utils';

interface CouponListProps {
  items: EmployerCouponListItem[];
}
//TODO - 추후 쿠폰 할인율 추가 시 수정 필요
export default function CouponList({ items }: CouponListProps) {
  return (
    <S.CouponList>
      {items.map((item) => (
        <S.CouponItem key={item.id} $isUsed={item.isUsed}>
          <div className="form">
            <div className="form__left">
              <h6 className="form__left--title">{item.description}</h6>

              {item.discountType === 'FIXED' && <p className="form__left--price">₩ {priceComma(item.discountAmount)}</p>}

              <div className="form__left--date">
                {item.minOrderAmount > 0 && <span>최소 주문 금액 {priceComma(item.minOrderAmount)}원</span>}
                {item.expiresAt && <p className="content-box__date">{dateFormat.date(item.expiresAt, 'YYYY.MM.DD')}까지</p>}
                {!item.expiresAt && <p className="content-box__date">유효기간 없음</p>}
              </div>
            </div>

            <div className="form__right">
              <p className="form__right--text">COUPON</p>
            </div>
          </div>

          <StyledCircle />
        </S.CouponItem>
      ))}
    </S.CouponList>
  );
}

const StyledCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  z-index: 2;
  background-color: #fff;
`;

const S = {
  CouponList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  `,
  CouponItem: styled.div<{ $isUsed: boolean }>`
    width: calc(33.3% - 13px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px;
    border-radius: 5px;
    user-select: text;
    position: relative;
    overflow: hidden;
    background: ${({ $isUsed }) =>
      $isUsed ? 'linear-gradient(to right, #bcbcbc, #bcbcbc)' : 'linear-gradient(to right, #3182f6, #4593fc)'};
    .form {
      /* height: 100%; */
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: #fff;
      &__left {
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px;
        &--title {
          font-weight: 500;
          font-size: 15px;
          line-height: 1.2;
          white-space: pre-line;
        }
        &--price {
          padding-top: 10px;
          font-size: 30px;
          font-weight: 700;
          display: flex;
          align-items: center;
        }
        &--date {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          font-size: 13px;
          p {
            padding-top: 2px;
          }
        }
      }

      &__right {
        width: 80px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        /* 대시 간격 조절 */
        background: linear-gradient(to bottom, transparent 50%, #ffffff 50%);
        background-size: 2px 10px;
        background-repeat: repeat-y;
        &--text {
          font-size: 15px;
          transform: rotate(0deg);
          padding-left: 5px;
          writing-mode: vertical-lr;
          letter-spacing: 2px;
          color: #fff;
        }
      }
    }
  `,
};
