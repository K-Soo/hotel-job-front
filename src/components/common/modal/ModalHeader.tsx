import styled from 'styled-components';
import Icon from '@/icons/Icon';
import useResponsive from '@/hooks/useResponsive';
import IconHover from '@/components/common/IconHover';

interface ModalHeaderProps {
  title?: string;
  handleCloseModal: () => void;
  isStepForm?: boolean;
  setInitialStepIndex?: () => void;
  stepIndex?: number;
  borderBottom?: string;
}

export function ModalHeader({ title, isStepForm, setInitialStepIndex, handleCloseModal, borderBottom, stepIndex = 0 }: ModalHeaderProps) {
  const { isTablet, isMobile } = useResponsive();

  return (
    <S.ModalHeader $isTablet={isTablet} $borderBottom={borderBottom}>
      <i className="back">
        {!isStepForm && isMobile && <Icon name="ArrowLeft24x24" width="24px" height="24px" onClick={() => handleCloseModal()} />}
        {isStepForm && isMobile && stepIndex === 0 && (
          <Icon name="ArrowLeft24x24" width="24px" height="24px" onClick={() => handleCloseModal()} />
        )}

        {isStepForm && stepIndex !== 0 && (
          <Icon
            name="ArrowLeft24x24"
            width="24px"
            height="24px"
            onClick={() => {
              if (setInitialStepIndex) {
                setInitialStepIndex();
              }
            }}
          />
        )}
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
  ModalHeader: styled.div<{ $isTablet: boolean; $borderBottom?: string }>`
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    border-bottom: ${(props) => (props.$borderBottom ? props.$borderBottom : '1px solid #e5e8eb')};
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
