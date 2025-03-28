import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Image from 'next/image';
import IconDimmed from '@/components/common/IconDimmed';
import Icon from '@/icons/Icon';
import { url } from '@/constants/oauth';
import useAuth from '@/hooks/useAuth';
import SkeletonUI from '@/components/common/SkeletonUI';
import { Role } from '@/constants/role';
import useSignout from '@/hooks/useSignout';
import path from '@/constants/path';
import { useRouter } from 'next/router';

export default function Member() {
  const router = useRouter();
  const { authAtomState, isAuthenticated, isUnAuthenticated, isAuthLoading, role } = useAuth();

  const { handleClickSignout } = useSignout();

  const handleClickSocialSignInButton = (type: 'KAKAO' | 'GOOGLE') => {
    const state = encodeURIComponent(JSON.stringify({ requestType: 'signIn' }));
    const baseUrl = url[type] + `&state=${state}`;
    window.location.href = baseUrl;
  };

  return (
    <div className="hidden h-[220px] w-[280px] shrink-1 flex-col rounded-[20px] bg-white p-6 shadow-md md:flex">
      {isAuthLoading && (
        <div className="flex h-full flex-col">
          <SkeletonUI.Line style={{ marginBottom: '10px' }} />
          <SkeletonUI.Line />
        </div>
      )}

      {isAuthenticated && (
        <div className="flex h-full flex-col">
          <div className="mb-2 flex items-center justify-between">
            <button className="cursor-pointer text-[14px] text-gray-600 hover:underline" onClick={() => handleClickSignout()}>
              로그아웃
            </button>
            <Icon name="Settings24x24" width="20px" height="20px" color="#444444" />
          </div>

          <div className="leading-5 font-medium">
            <p className="text-[16px]">안녕하세요</p>
            <p className="text-[20px]">
              <span className="text-blue-400">{authAtomState.nickname}</span>
              <span className="pl-0.5">님</span>
            </p>
          </div>

          <div className="mt-2 flex flex-1 flex-col justify-between">
            {role === Role.JOB_SEEKER && (
              <>
                <Button
                  label="이력서"
                  variant="primary"
                  borderRadius="10px"
                  margin="0 0 8px 0"
                  onClick={() => router.push(path.USER_RESUME)}
                />
                <Button
                  label="지원현황"
                  variant="secondary100"
                  borderRadius="10px"
                  onClick={() => router.push(path.USER_APPLICATION_HISTORY)}
                />
              </>
            )}

            {role === Role.EMPLOYER && (
              <>
                <Button
                  label="대시보드"
                  variant="primary"
                  borderRadius="10px"
                  margin="0 0 8px 0"
                  onClick={() => router.push(path.EMPLOYER)}
                />
                <Button
                  label="공고관리"
                  variant="secondary100"
                  borderRadius="10px"
                  margin="0 0 8px 0"
                  onClick={() => router.push(path.EMPLOYER_RECRUITMENT)}
                />
              </>
            )}
          </div>
        </div>
      )}

      {isUnAuthenticated && (
        <>
          <button className="w-[100%] cursor-pointer text-right text-sm text-gray-700 hover:underline">회원가입</button>

          <div className="mt-3 flex-1">
            <Button label="로그인" variant="primary" onClick={() => router.push(path.SIGN_IN)} />
          </div>

          <S.SignInLine>간편 로그인</S.SignInLine>

          <ul className="flex justify-center gap-5 pt-1">
            <IconDimmed width="40px" height="40px" onClick={() => handleClickSocialSignInButton('KAKAO')}>
              <Image src="/images/social/kakao_icon.svg" width={18} height={18} alt="kakao" className="image-icon" />
            </IconDimmed>

            <IconDimmed width="40px" height="40px" onClick={() => handleClickSocialSignInButton('GOOGLE')}>
              <Image src="/images/social/google_icon.svg" width={18} height={18} alt="google" className="image-icon" />
            </IconDimmed>
          </ul>
        </>
      )}
    </div>
  );
}

const S = {
  SignInLine: styled.p`
    font-size: 13px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
    height: 30px;
    color: var(--color-gray-700);
    &::before {
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: var(--color-gray-300);
      margin-right: 10px;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: var(--color-gray-300);
      margin-left: 10px;
    }
  `,
};
