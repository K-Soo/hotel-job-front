import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { url } from '@/constants/oauth';

export default function GeneralForm() {
  const handleClickSocialSignInButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.name as 'KAKAO' | 'GOOGLE';

    //TODO - IOS
    // if (window?.webkit) {
    //   router.push('/oauth/callback/kakao');
    //   return window.webkit?.messageHandlers?.socialType?.postMessage(type);
    // }
    // if (isWebview === "1") {
    //   return window?.jsToWebviewSocialChannel?.postMessage(JSON.stringify({ message: type })); //KAKAO , APPLE, GOOGLE
    // }
    // window.location.href = SOCIAL_URL[type];

    const state = encodeURIComponent(JSON.stringify({ requestType: 'signIn' }));
    const baseUrl = url[type] + `&state=${state}`;
    window.location.href = baseUrl;
  };

  return (
    <S.GeneralForm>
      <S.SocialButton name="KAKAO" onClick={handleClickSocialSignInButton}>
        <Image src="/images/social/kakao_icon.svg" width={18} height={18} alt="kakao" className="image-icon" />
        <span className="text">카카오 로그인</span>
      </S.SocialButton>

      <S.SocialButton name="GOOGLE" onClick={handleClickSocialSignInButton}>
        <Image src="/images/social/google_icon.svg" width={18} height={18} alt="google" className="image-icon" />
        <span className="text">구글 로그인</span>
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
