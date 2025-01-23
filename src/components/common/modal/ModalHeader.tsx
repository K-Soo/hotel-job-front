import styled from 'styled-components';
import Icon from '@/icons/Icon';
import useModal from '@/hooks/useModal';
import useResponsive from '@/hooks/useResponsive';
import IconHover from '@/components/common/IconHover';

interface ModalHeaderProps {
  title?: string;
}

export function ModalHeader({ title }: ModalHeaderProps) {
  const { setModalAtomState } = useModal();
  const { isTablet } = useResponsive();

  return (
    <S.ModalHeader $isTablet={isTablet}>
      <i className="back" onClick={() => setModalAtomState({ isOpen: false })}>
        <Icon name="ArrowLeft24x24" width="24px" height="24px" />
      </i>

      <h2 className="title">{title}</h2>

      <i className="close" onClick={() => setModalAtomState({ isOpen: false })}>
        <IconHover onClick={() => setModalAtomState({ isOpen: false })} padding="6px">
          <Icon name="Close25x25" width="22px" height="22px" />
        </IconHover>
      </i>
    </S.ModalHeader>
  );
}

const S = {
  ModalHeader: styled.div<{ $isTablet: boolean }>`
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    font-size: 0;
    .back {
      flex-basis: 50px;
      display: flex;
      visibility: ${(props) => (props.$isTablet ? 'visible' : 'hidden')};
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
    }
    .close {
      flex-basis: 50px;
      display: flex;
      justify-content: flex-end;
      visibility: ${(props) => (props.$isTablet ? 'hidden' : 'visible')};
    }
  `,
};
