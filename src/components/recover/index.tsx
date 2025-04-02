import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import { useRouter } from 'next/router';

export default function Recover() {
  const router = useRouter();

  return (
    <S.Recover>
      <h1 className="md:md-[50px] mb-[30px] text-center text-[18px] font-semibold md:text-3xl">아이디 · 비밀번호 찾기</h1>

      <p className="text-md text-black-500 mb-[50px] text-center">
        아이디와 비밀번호를 찾으려면 회원정보에 등록된 정보 또는 휴대폰 인증으로 찾을 수 있어요.
      </p>

      <S.ContentBox>
        <div className="item">
          <div className="item__wrapper">
            <h2 className="item__wrapper--title">아이디를 찾으시나요?</h2>
            <p className="item__wrapper--text">이메일 또는 본인인증정보로 아이디를 알려드려요.</p>
          </div>
          <Button label="아이디 찾기" variant="primary" borderRadius="8px" onClick={() => router.push(path.RECOVER_ACCOUNT)} />
        </div>

        <div className="item">
          <div className="item__wrapper">
            <h2 className="item__wrapper--title">비밀번호를 찾으시나요?</h2>
            <p className="item__wrapper--text">가입 시 본인인증정보로 찾기가 가능합니다.</p>
          </div>
          <Button label="비밀번호 찾기" variant="primary" borderRadius="8px" onClick={() => alert('준비중입니다.')} />
        </div>
      </S.ContentBox>

      <ul className="flex h-[90px] list-disc flex-col justify-center rounded-2xl bg-gray-50 px-[50px] py-[10px] align-middle text-[14px] text-gray-800">
        <li className="p-0.5">아이디·비밀번호 찾기가 어려운 경우 고객센터에 도움을 요청해 주세요.</li>
        <li className="p-0.5">아이디 · 비밀번호 찾기는 업체회원만 가능합니다.</li>
      </ul>
    </S.Recover>
  );
}

const S = {
  Recover: styled.section`
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  `,
  ContentBox: styled.div`
    display: flex;
    gap: 30px;
    margin: 30px 0;
    ${(props) => props.theme.media.tablet`
      gap: 15px;
    `};
    ${(props) => props.theme.media.mobile`
      flex-direction: column;
    `};
    .item {
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      border-radius: 15px;
      flex: 1;
      aspect-ratio: 1 / 0.8;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      ${(props) => props.theme.media.tablet`
        padding: 30px 15px;
        aspect-ratio: 1 / 0.9;
        `};
      ${(props) => props.theme.media.mobile`
        flex: auto;
        aspect-ratio: 1;
        height: 230px;
      `};
      &__wrapper {
        flex: 1;
        &--title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
          text-align: center;
          margin-bottom: 20px;
        }
        &--text {
          font-size: 15px;
          color: ${({ theme }) => theme.colors.gray600};
        }
      }
    }
  `,
};
