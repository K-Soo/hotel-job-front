import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function Custom404() {
  const router = useRouter();

  return (
    <Styled404>
      <div className="container">
        <h4 className="title">요청한 페이지를 찾을 수 없습니다.</h4>
        <p className="text">올바른 주소인지 확인 후 다시 시도해 주세요.</p>
        <Button label="홈으로" variant="cancel" width="140px" onClick={() => router.replace(path.HOME)} />
      </div>
    </Styled404>
  );
}

const Styled404 = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray100};
  &::before {
    content: '404';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.05);
    z-index: 0;
    pointer-events: none;
    ${(props) => props.theme.media.tablet`
      font-size: 15rem; 
    `}

    ${(props) => props.theme.media.mobile`
      font-size: 10rem; 
    `}
  }

  .container {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 15px;
    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 10px;
      ${(props) => props.theme.media.mobile`
        font-size: 20px;
      `};
    }
    .text {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 300;
      line-height: 1.2;
      color: ${(props) => props.theme.colors.black400};
      font-weight: 300;
      ${(props) => props.theme.media.mobile`
        font-size: 16px;
      `};
    }
  }
`;
