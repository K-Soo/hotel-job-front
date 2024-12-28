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

export default function ProductOptionAsideMenu() {
  const setProductOptionAsideMenuAtom = useSetRecoilState(productOptionAsideMenuAtom);
  const router = useRouter();

  const handleClickCheckout = () => {
    router.push(path.EMPLOYER_PRODUCT_CHECKOUT);
  };

  return (
    <Portal>
      <Background>
        <S.ProductOptionAsideMenu initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }}>
          <S.Header>
            <h4>옵션 선택</h4>
            <Icon name="Card24x24" onClick={() => setProductOptionAsideMenuAtom({ isOpen: false })} />
          </S.Header>

          <S.Content>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa voluptatum voluptate est provident. Tenetur error, dolorum
              expedita eaque fuga est quam quo voluptatem et facere nobis laudantium eum suscipit id.
            </p>
          </S.Content>

          <S.PurchaseActionBar>
            <Button label="상품 구매" variant="checkout" height="50px" fontSize="20px" borderRadius="3px" onClick={handleClickCheckout} />
          </S.PurchaseActionBar>
        </S.ProductOptionAsideMenu>
      </Background>
    </Portal>
  );
}

const S = {
  ProductOptionAsideMenu: styled(motion.aside)`
    position: fixed;
    right: 0;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.white};
    z-index: 10;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Header: styled.div`
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 20px;
  `,
  Content: styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.colors.gray100};
    padding: 20px;
    overflow-y: auto;
  `,
  PurchaseActionBar: styled.div`
    height: 100px;
    background-color: ${(props) => props.theme.colors.black400};
    padding: 20px;
  `,
};
