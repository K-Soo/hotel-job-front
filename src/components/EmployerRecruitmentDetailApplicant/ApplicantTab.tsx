import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import { keepPreviousData } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import SkeletonUI from '@/components/common/SkeletonUI';
import { RecruitmentApplicantQueryStep } from '@/types/API';
import { EMPLOYER_REVIEW_STAGE_STATUS_WIDTH_TOTAL } from '@/constants/application';

interface Query extends ParsedUrlQuery {
  step?: RecruitmentApplicantQueryStep;
  slug: string;
}

export default function ApplicantTab() {
  const router = useRouter();
  const { step = 'TOTAL', slug } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.APPLICATION_RECRUITMENT_STATUS_COUNT, { slug }].filter(Boolean),
    queryFn: Get.recruitmentApplicationStatusCount,
    options: {
      enabled: !!slug,
      throwOnError: true,
      staleTime: 60 * 1000 * 1,
      gcTime: 60 * 1000 * 2,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  console.log('지원자 상태별 수량 API : ', data);

  const handleTabClick = (newStatus: string) => {
    const searchParams = new URLSearchParams(router.query as Record<string, string>);
    const lowerCaseStatus = newStatus.toLowerCase();

    if (lowerCaseStatus === 'total') {
      searchParams.delete('step');
    } else {
      searchParams.set('step', lowerCaseStatus);
    }

    router.replace(
      {
        pathname: router.pathname,
        query: Object.fromEntries(searchParams),
      },
      undefined,
      { scroll: false },
    );
  };

  return (
    <S.ApplicantTab>
      {isLoading && <SkeletonUI.Tabs />}
      {isSuccess && data && (
        <div className="tab-container">
          {Object.entries(data.result)
            .sort(([keyA], [keyB]) => {
              if (keyA === 'TOTAL') return -1;
              if (keyB === 'TOTAL') return 1;
              return 0;
            })
            .map(([key, value]) => (
              <button key={key} className="tab-container__item" onClick={() => handleTabClick(key)}>
                <motion.span
                  animate={{
                    color: step.toUpperCase() === key ? '#333' : '#4e5968',
                    fontWeight: step.toUpperCase() === key ? '600' : '400',
                  }}
                >
                  {EMPLOYER_REVIEW_STAGE_STATUS_WIDTH_TOTAL[key as keyof typeof EMPLOYER_REVIEW_STAGE_STATUS_WIDTH_TOTAL]}
                </motion.span>
                <motion.span
                  animate={{
                    color: step.toUpperCase() === key ? '#333' : '#4e5968',
                    fontWeight: step.toUpperCase() === key ? '600' : '400',
                  }}
                  className="tab-container__item--count"
                >
                  {value}
                </motion.span>
                {step.toUpperCase() === key && <StyledUnderLine />}
              </button>
            ))}
        </div>
      )}
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
    z-index: 5;
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
        &--count {
          padding-left: 3px;
        }
      }
    }
  `,
};
