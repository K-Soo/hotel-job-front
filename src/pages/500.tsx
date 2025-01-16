import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';

export default function Custom500() {
  const router = useRouter();

  return (
    <Styled500>
      <div className="container">
        <h4 className="title">예기치 못한 문제가 발생했습니다.</h4>
        <p className="text">
          이용에 불편을 드려 죄송합니다. 잠시 후 다시 시도해 주세요. <br />
          문제가 지속된다면 고객센터로 문의해 주세요.
        </p>
        <Button label="홈으로" variant="cancel" width="140px" onClick={() => router.replace(path.HOME)} />
      </div>
    </Styled500>
  );
}

const Styled500 = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray100};
  &::before {
    content: '500';
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
    margin-bottom: 90px;
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
      margin-bottom: 15px;
      ${(props) => props.theme.media.mobile`
        font-size: 20px;
      `};
    }
    .text {
      font-size: 16px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.colors.black400};
      font-weight: 300;
      line-height: 1.2;
      ${(props) => props.theme.media.mobile`
        font-size: 16px;
      `};
    }
  }
`;
