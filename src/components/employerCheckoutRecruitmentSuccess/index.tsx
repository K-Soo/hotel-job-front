import styled from 'styled-components';
import path from '@/constants/path';
import { PaymentRecruitmentConfirmData } from '@/types';
import Button from '@/components/common/style/Button';
import { priceComma } from '@/utils';
import PercentageProgressBar from '@/components/common/PercentageProgressBar';
import { useRouter } from 'next/router';
interface EmployerCheckoutRecruitmentSuccessProps {
  confirmForm: PaymentRecruitmentConfirmData;
}

export default function EmployerCheckoutRecruitmentSuccess({ confirmForm }: EmployerCheckoutRecruitmentSuccessProps) {
  const router = useRouter();

  return (
    <S.EmployerCheckoutRecruitmentSuccess>
      <div className="success-container">
        <S.SuccessContainer>
          <StyledSuccessIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z" />
            </svg>
          </StyledSuccessIcon>

          <h2 className="success-text">주문이 완료되었습니다.</h2>
          <p className="description">10분 이내 공고가 게시됩니다.</p>
          <p className="description">공고가 잘 등록되었는지 채용공고 페이지에서 살펴보세요!</p>

          <S.Content>
            <S.AmountInfo>
              <div className="order">
                <span className="order__text">주문번호</span>
                <span className="order__value">{confirmForm.paymentInfo.orderId}</span>
              </div>
              <div className="price">
                <span className="price__text">결제금액</span>
                <span className="price__value">{priceComma(confirmForm.paymentInfo.totalAmount)}원</span>
              </div>
              <div className="price">
                <span className="price__text">포인트 적립</span>
                <span className="price__value">{priceComma(confirmForm.pointInfo.earnedPoint)}P</span>
              </div>
            </S.AmountInfo>

            <S.Membership>
              <h2 className="title">멤버십 적립</h2>
              <PercentageProgressBar membershipInfo={confirmForm.membershipInfo} />
            </S.Membership>
          </S.Content>

          <Button
            label="채용공고 페이지"
            variant="primary"
            width="300px"
            fontSize="16px"
            margin="80px 0 0 0"
            borderRadius="30px"
            onClick={() => router.replace(path.EMPLOYER_RECRUITMENT)}
          />
        </S.SuccessContainer>
      </div>
    </S.EmployerCheckoutRecruitmentSuccess>
  );
}

const StyledSuccessIcon = styled.div`
  background-color: ${(props) => props.theme.colors.blue500};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  svg {
    width: 55px;
    height: 55px;
  }
`;

const S = {
  EmployerCheckoutRecruitmentSuccess: styled.section`
    .success-container {
      margin: 0 auto;
      height: 100%;
      max-width: 450px;
    }
  `,
  SuccessContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .success-text {
      font-size: 28px;
      margin-bottom: 20px;
      letter-spacing: 1px;
    }
    .description {
      font-size: 16px;
      color: ${(props) => props.theme.colors.black700};
      text-align: center;
      line-height: 1.3;
    }
  `,
  Content: styled.div`
    margin-top: 50px;
    width: 250px;
  `,
  AmountInfo: styled.div`
    .order {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__text {
        width: 100px;
        color: ${(props) => props.theme.colors.black500};
      }
    }
    .price {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__text {
        width: 100px;
        color: ${(props) => props.theme.colors.black500};
      }
    }
  `,
  Membership: styled.div`
    margin-top: 30px;
    .title {
      font-size: 20px;
      margin-bottom: 8px;
      color: ${(props) => props.theme.colors.black500};
      text-align: center;
    }
  `,
};
