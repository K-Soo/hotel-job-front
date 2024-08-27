import styled from "styled-components";
import Button from "@/components/common/Button";

interface ReCruitCategoryProps {}

export default function ReCruitCategory({}: ReCruitCategoryProps) {
  return (
    <S.ReCruitCategory>
      <Button name="positiveWhite" width="100px" borderRadius="20px" margin="0 15px 0 0" onClick={() => {}} label="호텔" />
      <Button name="positiveWhite" width="100px" borderRadius="20px" margin="0 15px 0 0" onClick={() => {}} label="펜션" />
      <Button name="positiveWhite" width="100px" borderRadius="20px" margin="" onClick={() => {}} label="알바 / 파출" />
    </S.ReCruitCategory>
  );
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
