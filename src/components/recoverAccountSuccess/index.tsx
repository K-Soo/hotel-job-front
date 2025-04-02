import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { useRouter } from 'next/router';
import path from '@/constants/path';

interface RecoverAccountSuccessProps {
  userId: string;
}

export default function RecoverAccountSuccess({ userId }: RecoverAccountSuccessProps) {
  const router = useRouter();

  return (
    <S.RecoverAccountSuccess>
      <S.ContentBox>
        <p className="md:md-[50px] mb-[30px] text-center text-[22px] font-semibold md:text-3xl">아이디 찾기 결과</p>
        <p className="w-full rounded-2xl bg-gray-50 p-[30px] text-center text-[24px] text-blue-500 select-text">{userId}</p>
        <Button
          label="로그인으로 이동"
          variant="primary"
          height="50px"
          maxWidth="220px"
          margin="50px 0 0 0"
          onClick={() => router.replace(`${path.SIGN_IN}?type=company`)}
        />
      </S.ContentBox>
    </S.RecoverAccountSuccess>
  );
}

const S = {
  RecoverAccountSuccess: styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray30};
    padding: 50px 0;
    display: flex;
    justify-content: center;
  `,
  ContentBox: styled.div`
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    height: 500px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 15px;
    padding: 50px;
    ${(props) => props.theme.media.tablet`
    margin: 15px;
  `};
    ${(props) => props.theme.media.mobile`
    padding: 30px 20px;
  `};
    .button-group {
      display: flex;
    }
  `,
};
