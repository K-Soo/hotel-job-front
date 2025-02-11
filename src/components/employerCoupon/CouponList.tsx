import { EmployerCouponListItem } from '@/types';
import styled from 'styled-components';
import { priceComma, dateFormat } from '@/utils';
import Line from '@/components/common/Line';

interface CouponListProps {
  items: EmployerCouponListItem[];
}
//TODO - 쿠폰 할인율
export default function CouponList({ items }: CouponListProps) {
  return (
    <S.CouponList>
      {items.map((item) => (
        <S.CouponItem key={item.id}>
          <div className="price-box">{item.discountType === 'FIXED' && <span>{priceComma(item.discountAmount)}</span>}원</div>

          <Line margin="15px 0" />

          <div className="content-box">
            <div>
              <p className="content-box__description">{item.description}</p>
            </div>

            <div>
              {item.minOrderAmount !== 0 && (
                <p className="content-box__minOrderAmount">
                  <span>최소 상품 금액</span>
                  <span> {priceComma(item.minOrderAmount)}원</span>
                </p>
              )}
              <p className="content-box__date">{dateFormat.date(item.issuedAt, 'YYYY.MM.DD')}까지</p>
            </div>
          </div>
        </S.CouponItem>
      ))}
    </S.CouponList>
  );
}

const S = {
  CouponList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  `,
  CouponItem: styled.div`
    user-select: text;
    height: 150px;
    width: calc(50% - 10px);
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 20px;
    display: flex;
    flex-direction: column;
    .price-box {
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.red300};
    }
    .content-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__description {
        font-weight: 500;
      }
      &__minOrderAmount {
        font-size: 14px;
      }
      &__date {
        margin-top: 2px;
        font-size: 14px;
      }
    }
  `,
};
