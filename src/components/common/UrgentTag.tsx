import styled from 'styled-components';

interface UrgentTagProps {}

export default function UrgentTag({}: UrgentTagProps) {
  return <S.UrgentTag>급구</S.UrgentTag>;
}

const S = {
  UrgentTag: styled.span``,
};
