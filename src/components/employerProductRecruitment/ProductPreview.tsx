import styled from 'styled-components';

interface ProductPreviewProps {}

export default function ProductPreview({}: ProductPreviewProps) {
  return <S.ProductPreview>ProductPreview</S.ProductPreview>;
}

const S = {
  ProductPreview: styled.div`
    height: 800px;
    flex: 0 0 380px;
    border: 1px solid ${(props) => props.theme.colors.gray500};
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};
  `,
};
