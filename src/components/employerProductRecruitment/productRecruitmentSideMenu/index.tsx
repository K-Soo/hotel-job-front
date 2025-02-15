import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Icon from '@/icons/Icon';
import Line from '@/components/common/Line';
import { selectProductAtom, durationCalcOptionsSelector, selectRecruitmentIdAtom, productFocusAtom } from '@/recoil/product';
import PurchaseActionBar from '@/components/employerProductRecruitment/productRecruitmentSideMenu/PurchaseActionBar';
import ProductForm from '@/components/employerProductRecruitment/productRecruitmentSideMenu/ProductForm';
import RecruitmentInfo from '@/components/employerProductRecruitment/productRecruitmentSideMenu/RecruitmentInfo';
import ProductOption from '@/components/employerProductRecruitment/productRecruitmentSideMenu/ProductOption';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { Post } from '@/apis';
import Button from '@/components/common/style/Button';
import SkeletonUI from '@/components/common/SkeletonUI';
import useToast from '@/hooks/useToast';

interface ProductRecruitmentSideMenuProps {
  handleCloseSideMenu: () => void;
}

export default function ProductRecruitmentSideMenu({ handleCloseSideMenu }: ProductRecruitmentSideMenuProps) {
  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);
  const router = useRouter();

  const durationCalcOptionsSelectorValue = useRecoilValue(durationCalcOptionsSelector);
  const selectProductAtomValue = useRecoilValue(selectProductAtom);
  const { recruitmentId } = useRecoilValue(selectRecruitmentIdAtom);
  const { addToast } = useToast();

  const restProductFocusAtom = useResetRecoilState(productFocusAtom);
  const resetSelectProductAtom = useResetRecoilState(selectProductAtom);
  const resetSelectRecruitmentIdAtom = useResetRecoilState(selectRecruitmentIdAtom);

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_PUBLISHED_LIST],
    queryFn: Get.getPublishedRecruitmentList,
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 0,
      gcTime: 60 * 1000 * 10,
    },
  });

  console.log('채용공고 API : ', data);

  const isEmptyRecruitmentList = isSuccess && data && data.result.length === 0;

  const handleClickCheckout = async () => {
    if (!recruitmentId) {
      if (isEmptyRecruitmentList) {
        return addToast({ message: '채용공고를 먼저 등록해주세요.', type: 'info' });
      }
      return addToast({ message: '채용공고가 선택되지 않았습니다.', type: 'info' });
    }

    const options = selectProductAtomValue.selectedOptions.map((selectedOption) => {
      return {
        id: selectedOption.id,
        name: selectedOption.name,
        listUpIntervalHours: selectedOption.listUpIntervalHours,
        maxListUpPerDay: selectedOption.maxListUpPerDay,
        tags: selectedOption.tags,
        bonusDays: selectedOption.selectedOptionDuration.bonusDays,
        discountRate: selectedOption.selectedOptionDuration.discountRate,
        duration: selectedOption.selectedOptionDuration.duration,
        price: selectedOption.selectedOptionDuration.price,
      };
    });

    const requestData = {
      id: selectProductAtomValue.id,
      recruitmentId,
      name: selectProductAtomValue.name,
      type: selectProductAtomValue.type,
      duration: selectProductAtomValue.selectedDuration,
      options,
    };

    try {
      setIsLoadingPayment(true);
      const response = await Post.paymentRecruitmentInitiate(requestData);
      console.log('초기화 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error('초기화 API 실패');
      }

      await router.push(`${path.EMPLOYER_CHECKOUT_RECRUITMENT}/${response.result.orderId}`);

      resetSelectProductAtom();
      restProductFocusAtom();
      resetSelectRecruitmentIdAtom();
    } catch (error: any) {
      console.log('error: ', error.message);
      alert('주문 생성에 실패했습니다. 고객센터에 문의 바랍니다.');
    } finally {
      setIsLoadingPayment(false);
    }
  };

  return (
    <Portal>
      <Background onClick={handleCloseSideMenu}>
        <S.ProductRecruitmentSideMenu onClick={(e) => e.stopPropagation()}>
          <S.Header>
            <h4>옵션 선택</h4>
            <Icon name="CloseA24x24" onClick={handleCloseSideMenu} width="32px" height="32px" />
          </S.Header>

          <S.ContentContainer>
            <S.ContentTitle>
              <h6>상품 정보</h6>
            </S.ContentTitle>
            <S.ContentWrapper>
              <ProductForm />
            </S.ContentWrapper>

            <Line margin="30px 0" color="#e8f3ff" />

            <S.ContentTitle>
              <h6>채용공고 선택</h6>
            </S.ContentTitle>
            {isLoading && <SkeletonUI.Line style={{ height: '65px' }} />}
            {isSuccess && data && (
              <S.ContentWrapper>
                <RecruitmentInfo items={data.result} />
              </S.ContentWrapper>
            )}

            <Line margin="30px 0" color="#e8f3ff" />

            <S.ContentTitle>
              <h6>효과 플러스 옵션</h6>
              <p>놓치면 후회할 한정 가격! 함께 구매하면 더 큰 효과를 경험할 수 있어요.</p>
            </S.ContentTitle>

            <S.ContentWrapper>
              {durationCalcOptionsSelectorValue?.map((option) => (
                <ProductOption key={option.id} option={option} />
              ))}
            </S.ContentWrapper>
          </S.ContentContainer>

          <PurchaseActionBar>
            <Button
              label={isEmptyRecruitmentList ? '채용공고를 먼저 등록해주세요' : '상품 주문'}
              variant="checkout"
              height="50px"
              fontSize="20px"
              borderRadius="3px"
              margin="15px 0 0 0"
              onClick={handleClickCheckout}
              disabled={isEmptyRecruitmentList}
              isLoading={isLoading || isLoadingPayment}
            />
          </PurchaseActionBar>
        </S.ProductRecruitmentSideMenu>
      </Background>
    </Portal>
  );
}

const S = {
  ProductRecruitmentSideMenu: styled.div`
    position: fixed;
    right: 0;
    height: 100vh;
    background-color: white;
    z-index: 20;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* border-right: 1px solid ${(props) => props.theme.colors.gray100}; */
  `,
  Header: styled.div`
    height: 60px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 20px;
  `,
  ContentContainer: styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.colors.gray100};
    padding: 20px;
    overflow-y: auto;
  `,
  ContentTitle: styled.h6`
    margin-bottom: 7px;
    & > h6 {
      font-size: 18px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.black400};
    }
    p {
      margin-top: 3px;
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.gray600};
    }
  `,
  ContentWrapper: styled.div`
    padding: 0 10px;
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 5px;
  `,
};
