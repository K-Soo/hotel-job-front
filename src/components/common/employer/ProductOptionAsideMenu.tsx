import styled from 'styled-components';
import { motion } from 'framer-motion';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import { useSetRecoilState } from 'recoil';
import { productOptionAsideMenuAtom } from '@/recoil/payment';
import Icon from '@/icons/Icon';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import { productUseDateOptions } from '@/constants/options';
import Select from '@/components/common/style/Select';
import CheckBox from '@/components/common/style/CheckBox';
import Tag from '@/components/common/Tag';
import SaleRate from '@/components/common/SaleRate';
import Line from '@/components/common/Line';

export default function ProductOptionAsideMenu() {
  const setProductOptionAsideMenuAtom = useSetRecoilState(productOptionAsideMenuAtom);
  const router = useRouter();

  const handleClickCheckout = () => {
    router.push(path.EMPLOYER_PRODUCT_CHECKOUT);
  };

  return (
    <Portal>
      <Background onClick={() => setProductOptionAsideMenuAtom({ isOpen: false })}>
        <S.ProductOptionAsideMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          onClick={(e) => e.stopPropagation()}
        >
          <S.Header>
            <h4>옵션 선택</h4>
            <Icon name="Card24x24" onClick={() => setProductOptionAsideMenuAtom({ isOpen: false })} />
          </S.Header>

          <S.Content>
            <S.ContentTitle>
              <h6>상품 정보</h6>
            </S.ContentTitle>
            <S.ContentSectionTemplate>
              <p>프리미엄</p>
            </S.ContentSectionTemplate>

            <Line margin="30px 0" color="#e8f3ff" />

            <S.ContentTitle>
              <h6>채용공고 선택</h6>
            </S.ContentTitle>
            <S.ContentSectionTemplate>
              <Select options={productUseDateOptions} />
            </S.ContentSectionTemplate>

            <Line margin="30px 0" color="#e8f3ff" />

            <S.ContentTitle>
              <h6>효과 플러스 옵션</h6>
              <p>놓치면 후회할 한정 가격! 함께 구매하면 더 큰 효과를 경험할 수 있어요.</p>
            </S.ContentTitle>
            <S.ContentSectionTemplate>
              <StyledOptionForm>
                <CheckBox checked onChange={() => {}} name="" />
                <div className="flex-box">
                  <div className="flex-box__title">
                    <h6 className="flex-box__title--text">끌어올리기</h6>
                    <Tag label="PC+M" margin="0 0 0 7px" />
                    <Tag label="BEST" margin="0 0 0 7px" type="BEST" />
                  </div>
                  <p className="guide">매일 2번 리스트 최상단으로 끌어올림</p>
                </div>
                <div>
                  <p>
                    <SaleRate rate={10} />
                    <del>2,000원</del>
                  </p>
                  <ins>1,000원</ins>
                </div>
              </StyledOptionForm>

              <Line />

              <StyledOptionForm>
                <CheckBox checked onChange={() => {}} name="" />
                <div className="flex-box">
                  <div className="flex-box__title">
                    <h6 className="flex-box__title--text">형광펜</h6>
                    <Tag label="PC+M" margin="0 0 0 7px" />
                  </div>
                  <p className="guide">매일 2번</p>
                </div>
                <div>
                  <p>
                    <SaleRate rate={10} />
                    <del>2,000원</del>
                  </p>
                  <ins>1,000원</ins>
                </div>
              </StyledOptionForm>

              <Line />

              <StyledOptionForm marginBottom="15px">
                <CheckBox checked onChange={() => {}} name="" />
                <div className="flex-box">
                  <div className="flex-box__title">
                    <h6 className="flex-box__title--text">태그</h6>
                    <Tag label="PC+M" margin="0 0 0 7px" />
                    <Tag label="BEST" margin="0 0 0 7px" type="BEST" />
                    <Tag label="급구" margin="0 0 0 7px" type="URGENT" />
                  </div>
                  <p className="guide">매일 2번</p>
                </div>
                <div>
                  <p>
                    <SaleRate rate={10} />
                    <del>2,000원</del>
                  </p>
                  <ins>1,000원</ins>
                </div>
              </StyledOptionForm>
            </S.ContentSectionTemplate>
          </S.Content>

          <S.PurchaseActionBar>
            <div className="product-price">
              <span>상품 금액</span>
              <div>
                <p>10,000원</p>
              </div>
            </div>
            <Line margin="5px 0" />
            <div className="total-price">
              <p>총 결제 금액</p>
              <p>10,000원</p>
            </div>
            <Button
              label="상품 구매"
              variant="checkout"
              height="50px"
              fontSize="20px"
              borderRadius="3px"
              margin="15px 0 0 0"
              onClick={handleClickCheckout}
            />
          </S.PurchaseActionBar>
        </S.ProductOptionAsideMenu>
      </Background>
    </Portal>
  );
}

const StyledOptionForm = styled.div<{ marginBottom?: string }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${(props) => props.marginBottom || '0'};
  .flex-box {
    align-items: center;
    flex: 1;
    &__title {
      display: flex;
      align-items: center;
      margin-top: 2px;
      &--text {
        font-size: 16px;
      }
    }
  }
  .guide {
    margin-top: 5px;
    font-size: 14px;

    color: ${(props) => props.theme.colors.gray600};
  }
`;

const S = {
  ProductOptionAsideMenu: styled(motion.aside)`
    position: fixed;
    right: 15px;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.blue};
    z-index: 1000;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid ${(props) => props.theme.colors.gray100};
  `,
  Header: styled.div`
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 20px;
  `,
  Content: styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.colors.blue50};
    padding: 20px;
    overflow-y: auto;
  `,
  ContentTitle: styled.h6`
    & > h6 {
      font-weight: 500;
      color: ${(props) => props.theme.colors.black400};
    }
    p {
      margin-top: 3px;
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.gray600};
    }
    margin-bottom: 7px;
  `,
  ContentSectionTemplate: styled.div`
    padding: 15px;
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray200};
  `,
  PurchaseActionBar: styled.div`
    min-height: 100px;
    background-color: ${(props) => props.theme.colors.black400};
    padding: 20px;
    color: ${(props) => props.theme.colors.white};
    .product-price {
      display: flex;
      justify-content: space-between;
    }
    .total-price {
      display: flex;
      justify-content: space-between;
      color: ${(props) => props.theme.colors.red300};
      font-size: 18px;
    }
  `,
};
