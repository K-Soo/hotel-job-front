import styled from 'styled-components';

interface ModalFooterProps {}

export function ModalFooter({}: ModalFooterProps) {
  return <S.ModalFooter>ModalFooter</S.ModalFooter>;
}

const S = {
  ModalFooter: styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
  `,
};
