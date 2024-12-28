import styled from 'styled-components';

interface ProductSectionPreviewProps {}

export default function ProductSectionPreview({}: ProductSectionPreviewProps) {
  return <S.ProductSectionPreview></S.ProductSectionPreview>;
}

const S = {
  ProductSectionPreview: styled.div`
    height: 800px;
    flex: 0 0 380px;
    border: 1px solid ${(props) => props.theme.colors.gray500};
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};
  `,
};
