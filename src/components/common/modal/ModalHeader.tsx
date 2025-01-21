import styled from 'styled-components';
import Icon from '@/icons/Icon';
import useModal from '@/hooks/useModal';

interface ModalHeaderProps {
  title?: string;
}

export function ModalHeader({ title }: ModalHeaderProps) {
  const { setModalAtomState } = useModal();

  return (
    <S.ModalHeader>
      <i className="back" onClick={() => setModalAtomState({ isOpen: false })}>
        <Icon name="ArrowLeft24x24" width="24px" height="24px" />
      </i>
      <h2 className="title">{title}</h2>
      <div className="hidden" />
    </S.ModalHeader>
  );
}

const S = {
  ModalHeader: styled.div`
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
    .hidden {
      flex-basis: 50px;
    }
  `,
};
