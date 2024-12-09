import styled, { css } from "styled-components";
import Image from "next/image";
import Icon from "@/icons/Icon";
import environment from "@/environment";
import { SOCIAL_URL } from "@/constants/social";
console.log("environment: ", environment.kakaoClientId);
import { useRouter } from "next/router";

interface PersonalProps {}

export default function Personal({}: PersonalProps) {
  const router = useRouter();
  const onClickSocialLogin = (type: string) => {
    const userConsentState = JSON.stringify({
      personal: true,
      service: true,
      marketing: false,
    });

    //SWIFT 전용
    // if (window?.webkit) {
    //   router.push('/oauth/callback/kakao');
    //   return window.webkit?.messageHandlers?.socialType?.postMessage(type);
    // }
    // if (isWebview === "1") {
    //   return window?.jsToWebviewSocialChannel?.postMessage(JSON.stringify({ message: type })); //KAKAO , APPLE, GOOGLE
    // }
    // window.location.href = SOCIAL_URL[type];
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${environment.kakaoClientId}&redirect_uri=${environment.kakaoRedirectUrl}&prompt=select_account`;
  };

  return (
    <S.Personal>
      <Icon name="Back" />

      <S.SocialButton name="kakao" onClick={() => onClickSocialLogin("kakao")}>
        <Image src="/images/social/kakao_icon.svg" width={18} height={18} alt="카카오_아이콘" className="image-icon" />
        <span className="text">Sign In with Kakao</span>
      </S.SocialButton>
      <S.SocialButton name="google" onClick={() => onClickSocialLogin("google")}>
        <Image src="/images/social/google_icon.svg" width={18} height={18} alt="구글_아이콘" className="image-icon" />
        <span className="text">Sign In with Google</span>
      </S.SocialButton>
      <S.SocialButton name="apple" onClick={() => onClickSocialLogin("apple")}>
        <Image src="/images/social/apple_icon.svg" width={18} height={18} alt="애플_아이콘" className="image-icon" />
        <span className="text">Sign In with Apple</span>
      </S.SocialButton>
    </S.Personal>
  );
}

const S = {
  Personal: styled.div``,
  SocialButton: styled.button<{ name: string }>`
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    padding: 0 15px;
    cursor: pointer;
    position: relative;
    .image-icon {
      position: absolute;
      left: 20px;
    }
    .text {
      font-weight: 700;
      font-size: 14px;
    }
    ${(props) =>
      props.name === "kakao" &&
      css`
        background-color: #fee500;

        margin-bottom: 10px;
        .text {
          margin-left: 24px;
          color: #000000 85%;
          opacity: 0.85;
        }
      `}
    ${(props) =>
      props.name === "google" &&
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
      props.name === "apple" &&
      css`
        background-color: #000;
        .text {
          color: #fff;
          margin-left: 24px;
        }
      `}
  `,
};
