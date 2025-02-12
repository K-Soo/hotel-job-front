import { CertificationStatus } from '@/types';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import { useRouter } from 'next/router';
interface RecruitmentCountProps {
  certificationStatus: CertificationStatus;
}

export default function RecruitmentCount({ certificationStatus }: RecruitmentCountProps) {
  const router = useRouter();

  if (certificationStatus !== 'VERIFIED') {
    return (
      <S.RecruitmentCount>
        <S.RecruitmentGuidContainer>
          <div className="text-wrapper">
            <h3 className="text-wrapper__title">첫 채용공고 무료등록!</h3>
            <p>본인인증 후 무료 채용공고 쿠폰을 받아보세요!</p>
          </div>
          <Button label="본인인증 페이지로 이동" variant="primary" width="220px" onClick={() => router.push(path.EMPLOYER_ACCOUNT)} />
        </S.RecruitmentGuidContainer>
      </S.RecruitmentCount>
    );
  }

  return (
    <S.RecruitmentCount>
      <S.RecruitmentCountContainer>
        <div className="item">
          <h6 className="item__title">전체공고</h6>
          <p className="item__text">10</p>
        </div>
        <div className="item">
          <h6 className="item__title">진행중</h6>
          <p className="item__text">2</p>
        </div>
        <div className="item">
          <h6 className="item__title">대기중</h6>
          <p className="item__text">2</p>
        </div>

        <div className="item">
          <h6 className="item__title">마감</h6>
          <p className="item__text">2</p>
        </div>
      </S.RecruitmentCountContainer>
    </S.RecruitmentCount>
  );
}

const S = {
  RecruitmentCount: styled.div`
    flex: 1;
    height: 180px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
  `,
  RecruitmentGuidContainer: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    .text-wrapper {
      flex: 1;
      &__title {
        font-size: 22px;
        margin-bottom: 5px;
        font-weight: 500;
      }
    }
  `,
  RecruitmentCountContainer: styled.div`
    flex: 1;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__title {
        font-size: 18px;
        margin-bottom: 15px;
        color: ${({ theme }) => theme.colors.black400};
      }
      &__text {
        font-size: 28px;
      }
    }
  `,
};
