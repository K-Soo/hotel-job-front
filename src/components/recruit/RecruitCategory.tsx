import styled from 'styled-components';
import Button from '@/components/common/style/Button';

interface ReCruitCategoryProps {}

export default function ReCruitCategory({}: ReCruitCategoryProps) {
  return <S.ReCruitCategory></S.ReCruitCategory>;
}

const S = {
  ReCruitCategory: styled.div`
    margin: 15px 0;
    display: flex;
    background-color: #ffffff;
    width: fit-content;
    padding: 10px;
    border-radius: 8px;
  `,
};
