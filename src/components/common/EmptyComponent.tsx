import styled from 'styled-components';
import Image from 'next/image';

interface EmptyComponentProps {
  message?: string;
  height?: string;
}

export default function EmptyComponent({ message, height }: EmptyComponentProps) {
  return (
    <S.EmptyComponent $height={height}>
      <div className="empty-container">
        <Image src="/images/box.png" width={80} height={80} alt="box" />
        <span className="text">{message || '데이터가 없습니다.'}</span>
      </div>
    </S.EmptyComponent>
  );
}

const S = {
  EmptyComponent: styled.div<{ $height?: string }>`
    height: ${(props) => props.$height || '400px'};
    .empty-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .text {
        margin-top: 15px;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
  `,
};
