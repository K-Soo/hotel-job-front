import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';

interface ErrorComponentProps {
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
}

export function ErrorComponent({ height, margin, padding, width }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <S.ErrorComponent $height={height} $margin={margin} $padding={padding} $width={width}>
      <div className="error-container">
        <p>오류가 발생했습니다.</p>

        <Button label="이전" variant="secondary" margin="30px 0 0 0" onClick={() => router.back()} />
      </div>
    </S.ErrorComponent>
  );
}

const S = {
  ErrorComponent: styled.section<{ $height?: string; $margin?: string; $padding?: string; $width?: string }>`
    padding: ${(props) => (props.$padding ? props.$padding : '0')};
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    height: ${(props) => (props.$height ? props.$height : 'auto')};
    display: flex;
    align-items: center;
    justify-content: center;
    .error-container {
      text-align: center;
    }
  `,
};
