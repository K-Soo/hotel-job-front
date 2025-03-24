import styled, { css } from 'styled-components';

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
    position: relative;

    ${(props) => props.theme.media.mobile`
      height: 85px;
      align-items: flex-start;
      &::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(rgba(255, 255, 255, 0), #fff);
        z-index: 1;
      }
    `};
  `,
};
