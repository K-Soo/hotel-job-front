import styled from 'styled-components';
import Icon from '@/icons/Icon';
import useModal from '@/hooks/useModal';
import useResponsive from '@/hooks/useResponsive';
import IconHover from '@/components/common/IconHover';

interface ModalHeaderProps {
  title?: string;
  handleCloseModal: () => void;
}

export function ModalHeader({ title, handleCloseModal }: ModalHeaderProps) {
  const { setModalAtomState } = useModal();
  const { isTablet, isMobile } = useResponsive();

  return (
    <S.ModalHeader $isTablet={isTablet}>
      <i className="back" onClick={() => handleCloseModal()}>
        {isMobile && <Icon name="ArrowLeft24x24" width="24px" height="24px" />}
      </i>

      <h2 className="title">{title}</h2>

      <i className="close" onClick={() => handleCloseModal()}>
        {!isMobile && (
          <IconHover onClick={() => handleCloseModal()} padding="6px">
            <Icon name="Close25x25" width="22px" height="22px" />
          </IconHover>
        )}
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
    }
  `,
};
