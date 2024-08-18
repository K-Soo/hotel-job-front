import styled from "styled-components";

interface PromotionBannerProps {}

export default function PromotionBanner({}: PromotionBannerProps) {
  return <S.PromotionBanner>PromotionBanner</S.PromotionBanner>;
}

const S = {
  PromotionBanner: styled.div`
    height: 30px;
    background-color: red;
  `,
};
