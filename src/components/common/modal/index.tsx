import styled from 'styled-components';
import { ModalHeader } from '@/components/common/modal/ModalHeader';
import { ModalFooter } from '@/components/common/modal/ModalFooter';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import useModal from '@/hooks/useModal';

interface ModalProps {
  width?: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

interface ModalContentProps {
  padding?: string;
  children: React.ReactNode;
}

export default function Modal({ width, handleCloseModal, children }: ModalProps) {
  return (
    <Portal>
      <Background
        onClick={(event: any) => {
          event.stopPropagation();
          handleCloseModal();
        }}
      >
        <S.Modal
          $width={width}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </S.Modal>
      </Background>
    </Portal>
  );
}

function ModalContent({ padding, children }: ModalContentProps) {
  return <StyledModalContent padding={padding}>{children}</StyledModalContent>;
}

const StyledModalContent = styled.div<{ padding?: string }>`
  flex: 1;
  padding: ${(props) => props.padding || '15px'};
  overflow-y: auto;
`;

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

const S = {
  Modal: styled.div<{ $width?: string }>`
    z-index: 15;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: ${(props) => props.$width || '500px'};
    height: 70%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    ${(props) => props.theme.media.mobile`
      top: 50%;
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    `};
  `,
};
