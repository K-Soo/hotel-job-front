import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Line from '@/components/common/Line';
import { priceComma } from '@/utils';
import SkeletonUI from '@/components/common/SkeletonUI';

interface DiscountInfoProps {
  finalTotalAmount: number | undefined;
  isLoading: boolean;
}

export default function DiscountInfo({ finalTotalAmount, isLoading }: DiscountInfoProps) {
  return (
    <S.DiscountInfo>
      <h2 className="title">할인선택</h2>
      {isLoading && <SkeletonUI.Line style={{ height: '80px' }} />}
      {!isLoading && (
        <S.DiscountContainer>
          <S.DiscountItem>
            <span className="discount-text">결제 예정금액</span>
            <div className="discount-content">{priceComma(finalTotalAmount)}원</div>
          </S.DiscountItem>

          <Line margin="0" />

          <S.DiscountItem>
            <span className="discount-text">쿠폰 적용</span>
            <div className="discount-content">
              <div className="discount-content__wrapper">
                <Button
                  label="쿠폰선택"
                  variant="tertiary"
                  height="30px"
                  width="90px"
                  fontSize="14px"
                  disabled={true}
                  margin="0 10px 0 0"
                />
                <p>(사용 가능 쿠폰 : 0장 | 보유 쿠폰 : 0장)</p>
              </div>
            </div>
          </S.DiscountItem>
        </S.DiscountContainer>
      )}
    </S.DiscountInfo>
  );
}

const S = {
  DiscountInfo: styled.div`
    padding: 30px;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.gray800};
    }
  `,
  DiscountContainer: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.black400};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black400};
  `,
  DiscountItem: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .discount-text {
      width: 150px;
      font-size: 14px;
    }
    .discount-content {
      &__wrapper {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  `,
};
