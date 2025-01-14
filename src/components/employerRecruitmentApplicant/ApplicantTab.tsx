import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@/components/common/style/Button';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import { keepPreviousData } from '@tanstack/react-query';
import SkeletonUI from '@/components/common/SkeletonUI';
import { RecruitmentApplicantQueryStep, RecruitmentQueryStatus } from '@/types/API';
import { recruitmentStatusWithAll } from '@/constants/recruitment';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
}

interface ApplicantTabProps {}

export default function ApplicantTab({}: ApplicantTabProps) {
  const router = useRouter();
  const { step = 'all' } = router.query as Query;

  const handleTabClick = (newStatus: string) => {
    const searchParams = new URLSearchParams(router.query as Record<string, string>);
    const lowerCaseStatus = newStatus.toLowerCase();

    if (lowerCaseStatus === 'all') {
      searchParams.delete('step');
    } else {
      searchParams.set('step', lowerCaseStatus);
    }

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(searchParams),
    });
  };

  return (
    <S.ApplicantTab>
      <div className="tab-container">
        <button className="tab-container__item" onClick={() => handleTabClick('ALL')}>
          <span>전체</span>
          <span>1</span>
          <StyledUnderLine />
        </button>
        <button className="tab-container__item" onClick={() => handleTabClick('DOCUMENT')}>
          <span>서류전형</span>
          <span>1</span>
        </button>
        <button className="tab-container__item" onClick={() => handleTabClick('INTERVIEW')}>
          <span>면접</span>
          <span>1</span>
        </button>
        <button className="tab-container__item" onClick={() => handleTabClick('ACCEPTED')}>
          <span>최종합격</span>
          <span>1</span>
        </button>
        <button className="tab-container__item" onClick={() => handleTabClick('REJECTED')}>
          <span>불합격</span>
          <span>1</span>
        </button>
      </div>
    </S.ApplicantTab>
  );
}

const StyledUnderLine = styled.div`
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  border-bottom: 2px solid #333;
`;

const S = {
  ApplicantTab: styled.div`
    position: sticky;
    top: 60px;
    height: 60px;
    background-color: white;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-container {
      display: flex;
      height: 100%;
      &__item {
        position: relative;
        cursor: pointer;
        padding: 0 20px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-align: center;
        width: 150px;
        height: 100%;
        color: ${(props) => props.theme.colors.gray700};
      }
    }
  `,
};
