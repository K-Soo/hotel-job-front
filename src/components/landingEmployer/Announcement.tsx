import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';
import useAuth from '@/hooks/useAuth';

export default function Announcement() {
  const router = useRouter();
  const { isUnAuthenticated } = useAuth();

  return (
    <S.Announcement>
      <div className="wrapper">
        <h1 className="main-title">
          훌륭한 인재를 빠르게 채용해 보세요.
          <br />
          <b className="highlight">첫 채용 공고 무료!</b>
        </h1>

        <p className="text">지금 바로 회원가입하고 필요한 인재를 찾아보세요.</p>
        {isUnAuthenticated && (
          <Button
            label="지금 무료로 시작하기"
            variant="primary"
            width="180px"
            margin="30px 0 0 0"
            onClick={() => router.push(`${path.SIGN_IN}?type=company`)}
          />
        )}
      </div>
    </S.Announcement>
  );
}

const S = {
  Announcement: styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(255, 248, 255, 0) 9.98%, #e8f3ff);
    ${(props) => props.theme.media.tablet`
      min-height: 350px;
    `};
    .wrapper {
      max-width: 1024px;
      width: 100%;
      padding: 100px 20px;
      ${(props) => props.theme.media.tablet`
        padding: 50px 20px;
      `};
      .main-title {
        font-size: 34px;
        font-weight: 500;
        line-height: 1.5;
        ${(props) => props.theme.media.tablet`
          font-size: 26px;
        `};
        .highlight {
          color: ${(props) => props.theme.colors.blue400};
        }
      }
      .text {
        margin-top: 15px;
        color: ${(props) => props.theme.colors.gray600};
        ${(props) => props.theme.media.tablet`
          font-size: 14px;
        `};
      }
    }
  `,
};
