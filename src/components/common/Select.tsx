import styled from "styled-components";

interface SelectProps {}

export default function Select({}: SelectProps) {
  return (
    <S.Select>
      <select name="" id="">
        <option value="">최신순</option>
        <option value="">오래된순</option>
      </select>
    </S.Select>
  );
}

const S = {
  Select: styled.div``,
};
