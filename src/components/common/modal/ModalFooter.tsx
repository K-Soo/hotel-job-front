import styled from 'styled-components';

interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <S.ModalFooter>{children}</S.ModalFooter>;
}

const S = {
  ModalFooter: styled.article`
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
  `,
};
