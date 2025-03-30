import styled, { css } from 'styled-components';
import Image from 'next/image';
import { url } from '@/constants/oauth';
import useRedirect from '@/hooks/useRedirect';

export default function GeneralForm() {
  const { getRedirectAfterLogin } = useRedirect();

  const handleClickSocialSignInButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name as 'KAKAO' | 'GOOGLE';

    //TODO - 고도화 시점에 IOS 웹뷰 개발 및 분기처리 안드로이드는 PWA로 진행
    // if (window?.webkit) {
    //   router.push('/oauth/callback/kakao');
    //   return window.webkit?.messageHandlers?.socialType?.postMessage(type);
    // }
    // if (isWebview ???) {
    //   return window?.jsToWebviewSocialChannel?.postMessage(JSON.stringify({ message: type }));
    // }
    // window.location.href = SOCIAL_URL[type];

    const redirect = getRedirectAfterLogin();

    const statePayload = {
      requestType: 'signIn',
      ...(redirect && { redirect }),
    };

    const state = encodeURIComponent(JSON.stringify(statePayload));
    const baseUrl = url[type] + `&state=${state}`;

    window.location.href = baseUrl;
  };

  return (
    <S.GeneralForm>
      <S.SocialButton name="KAKAO" onClick={handleClickSocialSignInButton}>
        <Image src="/images/social/kakao_icon.svg" width={18} height={18} alt="kakao" className="image-icon" />
        <span className="text">카카오로 시작하기</span>
      </S.SocialButton>

      <S.SocialButton name="GOOGLE" onClick={handleClickSocialSignInButton}>
        <Image src="/images/social/google_icon.svg" width={18} height={18} alt="google" className="image-icon" />
        <span className="text">구글로 시작하기</span>
      </S.SocialButton>
    </S.GeneralForm>
  );
}

const S = {
  GeneralForm: styled.div`
    width: 100%;
  `,
  SocialButton: styled.button<{ name: string }>`
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 30px;
    padding: 0 15px;
    cursor: pointer;
    position: relative;
    width: 100%;
    .image-icon {
      position: absolute;
      left: 20px;
    }
    .text {
      font-weight: 500;
      font-size: 14px;
    }
    ${(props) =>
      props.name === 'KAKAO' &&
      css`
        background-color: #fee500;
        margin-bottom: 15px;
        .text {
          margin-left: 24px;
          color: #000000 85%;
          opacity: 0.85;
        }
      `}
    ${(props) =>
      props.name === 'GOOGLE' &&
      css`
        background-color: #fff;
        color: #000;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        box-shadow: 1px 1px 1px #ddd;
        .text {
          color: rgba(0, 0, 0, 54%);
          margin-left: 24px;
        }
      `}
  ${(props) =>
      props.name === 'apple' &&
      css`
        background-color: #000;
        .text {
          color: #fff;
          margin-left: 24px;
        }
      `}
  `,
};
