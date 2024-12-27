import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import { useRouter } from 'next/router';

export default function LandingEmployer() {
  const router = useRouter();

  return (
    <S.LandingEmployer>
      <S.Announcement>
        <div>
          <p className="desc">훌륭한 인재를 빠르게 채용해 보세요.</p>
          <p className="desc">첫 채용 공고 무료 등록!</p>
          <p>지금 바로 회원가입하고 필요한 인재를 찾아보세요.</p>
          <Button
            label="지금 무료로 시작하기"
            variant="primary"
            width="180px"
            margin="30px 0 0 0"
            onClick={() => router.push(path.SIGN_UP)}
          />
          <Button label="미리보기" variant="primary" width="180px" margin="30px 0 0 0" onClick={() => router.push(path.EMPLOYER)} />
        </div>
      </S.Announcement>

      {/* <S.RecruitFlow>
        <p>채용 플로우</p>
      </S.RecruitFlow>

      <S.Advantage>
        <p>✅ 빠른 채용: 효과적인 채용 공고로 즉시 지원자 확보!</p>
        <p>✅ 간단한 절차: 누구나 손쉽게 공고 등록 가능!</p>
      </S.Advantage> */}
    </S.LandingEmployer>
  );
}

const S = {
  LandingEmployer: styled.section`
    width: 100%;
  `,
  Announcement: styled.article`
    width: 100%;
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .desc {
      font-size: 32px;
      padding: 5px 0;
    }
  `,
  RecruitFlow: styled.article``,
  Advantage: styled.article``,
};
