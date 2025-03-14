import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Line from '@/components/common/Line';
import { dateFormat, priceComma } from '@/utils';
import SkeletonUI from '@/components/common/SkeletonUI';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import { Post } from '@/apis';
import { AvailableCouponList } from '@/types';
import Radio from '@/components/common/style/Radio';
import Dimmed from '@/components/common/Dimmed';
import useToast from '@/hooks/useToast';
import { errorMessages } from '@/error';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { GetPaymentRecruitmentDetailResponse } from '@/types/API';
import { AxiosError } from 'axios';
import EmptyComponent from '@/components/common/EmptyComponent';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

interface DiscountInfoProps {
  TotalAmount: number | undefined;
  orderId: string | undefined;
  appliedCouponId: string | null;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<GetPaymentRecruitmentDetailResponse, AxiosError<unknown, any>>>;
}

export default function DiscountInfo({ TotalAmount, orderId, appliedCouponId, refetch }: DiscountInfoProps) {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [selectedCoupon, setSelectedCoupon] = React.useState<string | null>(null);
  const [currentAppliedCouponId, setCurrentAppliedCouponId] = React.useState<string | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingCoupon, setIsLoadingCoupon] = React.useState(false);

  const [couponList, setCouponList] = React.useState<AvailableCouponList>({
    availableCoupons: [],
    unavailableCoupons: [],
    totalCouponCount: 0,
  });

  const { addToast } = useToast();

  React.useEffect(() => {
    setSelectedCoupon(appliedCouponId);
    setCurrentAppliedCouponId(appliedCouponId);
  }, [appliedCouponId, isOpenModal]);

  // API 쿠폰 리스트 조회
  const fetchPaymentInfo = async (orderId: string) => {
    try {
      const response = await Post.availableCouponList({ orderId });
      console.log('사용가능한 쿠폰 리스트 API: ', response);
      setCouponList(response.result);
    } catch (error: any) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // API 쿠폰 적용
  const fetchApplyCoupon = async () => {
    if (!orderId) return;
    if (!selectedCoupon) return;

    if (selectedCoupon === currentAppliedCouponId) {
      return addToast({ message: '이미 적용된 쿠폰입니다.', type: 'warning' });
    }

    setIsLoadingCoupon(true);

    try {
      const response = await Post.applyCoupon({ orderId, couponId: selectedCoupon });
      console.log('쿠폰 적용 API : ', response.result);
      if (response.result.status === 'success') {
        addToast({ message: '쿠폰이 적용되었습니다.', type: 'success' });
        refetch();
        setIsOpenModal(false);
      }
      if (response.result.status === 'duplicate') {
        return addToast({ message: '이미 적용된 쿠폰입니다.', type: 'error' });
      }
    } catch (error: any) {
      const responseErrorCode = error.response?.data?.error?.code ?? null;

      if (errorMessages[responseErrorCode]) {
        alert(errorMessages[responseErrorCode]);
        return;
      }
      alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoadingCoupon(false);
    }
  };

  // API 쿠폰 적용 취소
  const fetchCancelCoupon = async () => {
    if (!orderId) return;

    if (!currentAppliedCouponId) {
      return addToast({ message: '적용된 쿠폰이 없습니다.', type: 'warning' });
    }

    setIsLoadingCoupon(true);

    try {
      const response = await Post.cancelCoupon({ orderId, couponId: currentAppliedCouponId });
      console.log('쿠폰 적용 취소 API : ', response.result);
      if (response.result.status !== 'success') {
        throw new Error();
      }

      refetch();
      setSelectedCoupon(null);
    } catch (error: any) {
      const responseErrorCode = error.response?.data?.error?.code ?? null;

      if (errorMessages[responseErrorCode]) {
        alert(errorMessages[responseErrorCode]);
        return;
      }
      alert('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoadingCoupon(false);
    }
  };

  React.useEffect(() => {
    if (!orderId) return;
    fetchPaymentInfo(orderId);
  }, [orderId]);

  const handleChangedCoupon = (value: string) => {
    // if (isLoadingCoupon) return;
    setSelectedCoupon(value);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    // 취소시 쿠폰이 적용되어있지않다면 선택 초기화
    if (!currentAppliedCouponId) {
      setSelectedCoupon(null);
    }
  };

  return (
    <>
      {isOpenModal && (
        <DynamicNoSSRModal handleCloseModal={() => handleCloseModal()}>
          <Modal.Header title="쿠폰" handleCloseModal={() => handleCloseModal()} />

          <Modal.Content>
            {couponList.availableCoupons.length === 0 && couponList.unavailableCoupons.length === 0 && (
              <EmptyComponent message="사용 가능한 쿠폰이 없습니다." />
            )}

            {couponList.availableCoupons.map((item) => (
              <StyledModalCouponListItem key={item.id} onClick={() => handleChangedCoupon(item.id)}>
                <div className="price-box">
                  <span>{item.discountType === 'FIXED' && <span>{priceComma(item.discountAmount)}</span>}원 할인</span>
                  <Radio checked={selectedCoupon === item.id} name="coupon" onChange={() => handleChangedCoupon(item.id)} value={item.id} />
                </div>
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
                    {item.expiresAt && <p className="content-box__date">{dateFormat.date(item.expiresAt, 'YYYY.MM.DD')}까지</p>}
                    {!item.expiresAt && <p className="content-box__date">만료 기간없음</p>}
                  </div>
                </div>
              </StyledModalCouponListItem>
            ))}

            {couponList.unavailableCoupons.map((item) => (
              <StyledModalCouponListItem key={item.id}>
                <Dimmed text={item.reason} />
                <div className="price-box">
                  <span>{item.discountType === 'FIXED' && <span>{priceComma(item.discountAmount)}</span>}원 할인</span>
                </div>
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
                    {item.expiresAt && <p className="content-box__date">{dateFormat.date(item.expiresAt, 'YYYY.MM.DD')}까지</p>}
                    {!item.expiresAt && <p className="content-box__date">만료 기간없음</p>}
                  </div>
                </div>
              </StyledModalCouponListItem>
            ))}
          </Modal.Content>
          <Modal.Footer>
            <Button label="취소" variant="secondary" margin="0 15px 0 0" onClick={() => handleCloseModal()} disabled={isLoadingCoupon} />
            <Button label="적용" variant="primary" onClick={() => fetchApplyCoupon()} disabled={!orderId} isLoading={isLoadingCoupon} />
          </Modal.Footer>
        </DynamicNoSSRModal>
      )}

      <S.DiscountInfo>
        <h2 className="title">할인 선택</h2>
        {isLoading && <SkeletonUI.Line style={{ height: '80px' }} />}
        {!isLoading && (
          <S.DiscountContainer>
            <S.DiscountItem>
              <span className="discount-text">결제 예정금액</span>
              <div className="discount-content">
                {!appliedCouponId && <span>{priceComma(TotalAmount)}원</span>}
                {appliedCouponId && (
                  <>
                    {TotalAmount === 0 && <StyledCouponUsed>무료</StyledCouponUsed>}
                    {TotalAmount !== 0 && <StyledCouponUsed>쿠폰적용가 {priceComma(TotalAmount)}원</StyledCouponUsed>}
                    <Button
                      label="쿠폰취소"
                      variant="secondary"
                      onClick={() => fetchCancelCoupon()}
                      disabled={isLoadingCoupon}
                      height="30px"
                      width="80px"
                      fontSize="14px"
                      margin="0 0 0 15px"
                    />
                  </>
                )}
              </div>
            </S.DiscountItem>

            <Line margin="0" />

            <S.DiscountItem>
              <span className="discount-text">쿠폰 적용</span>
              <div className="discount-content">
                <div className="discount-content__wrapper">
                  <Button
                    label="쿠폰선택"
                    variant="secondary100"
                    height="30px"
                    width="90px"
                    fontSize="14px"
                    disabled={isError}
                    margin="0 10px 0 0"
                    onClick={() => setIsOpenModal(true)}
                  />
                  {isError ? (
                    <StyledCouponCount>
                      <span>쿠폰 정보를 불러올수 없습니다.</span>
                    </StyledCouponCount>
                  ) : (
                    <StyledCouponCount $isAvailable={couponList.availableCoupons.length > 0}>
                      (사용 가능 쿠폰 : <span className="available">{couponList.availableCoupons.length}</span>장 | 보유 쿠폰 :{' '}
                      <span className="own">{couponList.totalCouponCount}</span>장)
                    </StyledCouponCount>
                  )}
                </div>
              </div>
            </S.DiscountItem>
          </S.DiscountContainer>
        )}
      </S.DiscountInfo>
    </>
  );
}

const StyledCouponUsed = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red300};
  min-width: 80px;
`;

const StyledCouponCount = styled.p<{ $isAvailable?: boolean }>`
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray600};
  letter-spacing: 0.2px;
  .available {
    color: ${(props) => (props.$isAvailable ? props.theme.colors.blue500 : props.theme.colors.gray600)};
    font-weight: 500;
  }
  .own {
    font-weight: 500;
  }
`;

const StyledModalCouponListItem = styled.div`
  position: relative;
  user-select: text;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
  .price-box {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.red400};
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 24px;
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
`;

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
      display: flex;
      align-items: center;
      &__wrapper {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  `,
};
