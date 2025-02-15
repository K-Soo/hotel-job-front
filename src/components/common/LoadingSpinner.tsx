import styled from 'styled-components';
import Image from 'next/image';

interface LoadingSpinnerProps {
  height?: string;
}

export default function LoadingSpinner({ height }: LoadingSpinnerProps) {
  return (
    <S.LoadingSpinner $height={height}>
      <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
    </S.LoadingSpinner>
  );
}

const S = {
  LoadingSpinner: styled.div<{ $height?: string }>`
    height: ${(props) => props.$height || '300px'};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
