import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';

interface ErrorComponentProps {
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
  message?: string;
  visibleBackButton?: boolean;
}

export function ErrorComponent({ height, margin, padding, width, message, visibleBackButton = true }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <S.ErrorComponent $height={height} $margin={margin} $padding={padding} $width={width}>
      <div className="error-container">
        {message && <p>{message}</p>}
        {!message && (
          <p>
            <span>서버에서 응답을 받을 수 없습니다.</span>
            <br />
            <span>잠시 후 다시 시도해주세요.</span>
          </p>
        )}
        {visibleBackButton && <Button label="이전" variant="secondary" margin="30px 0 0 0" onClick={() => router.back()} />}
      </div>
    </S.ErrorComponent>
  );
}

const S = {
  ErrorComponent: styled.section<{ $height?: string; $margin?: string; $padding?: string; $width?: string }>`
    padding: ${(props) => (props.$padding ? props.$padding : '30px 0')};
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    height: ${(props) => (props.$height ? props.$height : '200px')};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.gray700};
    line-height: 1.2;
    font-size: 14px;
    .error-container {
      text-align: center;
    }
  `,
};
