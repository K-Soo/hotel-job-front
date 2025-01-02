import styled from 'styled-components';

export function EmployerFooter() {
  return <S.EmployerFooter>©2024 celestara</S.EmployerFooter>;
}

const S = {
  EmployerFooter: styled.footer`
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 11px;
    padding: 0 15px;
    color: ${(props) => props.theme.colors.gray500};
  `,
};
