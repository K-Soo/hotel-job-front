import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { useSetRecoilState, useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { recruitmentProductSideMenuAtom } from '@/recoil/product';
import Icon from '@/icons/Icon';
import Line from '@/components/common/Line';
import { selectProductAtom, durationCalcOptionsSelector } from '@/recoil/product';
import PurchaseActionBar from '@/components/employerProductRecruitment/productAsideMenu/PurchaseActionBar';
import ProductForm from '@/components/employerProductRecruitment/productAsideMenu/ProductForm';
import RecruitmentInfo from '@/components/employerProductRecruitment/productAsideMenu/RecruitmentInfo';
import ProductOption from '@/components/employerProductRecruitment/productAsideMenu/ProductOption';

export default function ProductAsideMenu() {
  const setRecruitmentProductSideMenuAtom = useSetRecoilState(recruitmentProductSideMenuAtom);
  const resetSelectProductAtomState = useResetRecoilState(selectProductAtom);
  const resetRecruitmentProductSideMenuAtom = useResetRecoilState(recruitmentProductSideMenuAtom);

  const durationCalcOptionsSelectorValue = useRecoilValue(durationCalcOptionsSelector);

  const handleClose = () => {
    setRecruitmentProductSideMenuAtom({ isOpen: false });
    resetRecruitmentProductSideMenuAtom();
    resetSelectProductAtomState();
  };

  return (
    <Portal>
      <Background onClick={handleClose}>
        <S.ProductAsideMenu onClick={(e) => e.stopPropagation()}>
          <S.Header>
            <h4>옵션 선택</h4>
            <Icon name="CloseA24x24" onClick={handleClose} width="32px" height="32px" />
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
            <S.ContentWrapper>
              <RecruitmentInfo />
            </S.ContentWrapper>

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

          <PurchaseActionBar />
        </S.ProductAsideMenu>
      </Background>
    </Portal>
  );
}

const S = {
  ProductAsideMenu: styled.div`
    position: fixed;
    right: 0;
    height: 100vh;
    /* background-color: ${(props) => props.theme.colors.blue}; */
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
    /* background-color: ${(props) => props.theme.colors.blue50}; */
    background-color: white;
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
    /* border: 1px solid ${(props) => props.theme.colors.gray200}; */
    /* background-color: red; */
  `,
};
