import styled from 'styled-components';
import Image from 'next/image';

interface EmptyComponentProps {
  message?: string;
  height?: string;
  isVisibleImage?: boolean;
}

export default function EmptyComponent({ message, height, isVisibleImage = true }: EmptyComponentProps) {
  return (
    <S.EmptyComponent $height={height}>
      <div className="empty-container">
        {isVisibleImage && <Image className="box-image" src="/images/box.png" width={60} height={60} alt="box" />}
        <span className="text">{message || '등록된 정보가 없습니다.'}</span>
      </div>
    </S.EmptyComponent>
  );
}

const S = {
  EmptyComponent: styled.div<{ $height?: string }>`
    height: ${(props) => props.$height || '300px'};
    .empty-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .box-image {
        margin-bottom: 20px;
      }
      .text {
        color: ${(props) => props.theme.colors.black600};
        font-size: 16px;
        font-weight: 400;
      }
    }
  `,
};
