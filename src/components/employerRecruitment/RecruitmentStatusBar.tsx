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
import { RecruitmentQueryStatus } from '@/types/API';
import { recruitmentStatusWithAll } from '@/constants/recruitment';

interface Query extends ParsedUrlQuery {
  status?: RecruitmentQueryStatus;
}

export default function RecruitmentStatusBar() {
  const router = useRouter();
  const { status = 'all' } = router.query as Query;

  const { data, isLoading } = useFetchQuery({
    queryKey: [queryKeys.RECRUITMENT_STATUS],
    queryFn: Get.recruitmentStatusCount,
    options: {
      enabled: true,
      throwOnError: true,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
  });

  console.log('상태별 수량 API : ', data?.result);

  const handleTabClick = (newStatus: string) => {
    const searchParams = new URLSearchParams(router.query as Record<string, string>);
    const lowerCaseStatus = newStatus.toLowerCase();

    if (lowerCaseStatus === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', lowerCaseStatus);
    }

    router.replace({
      pathname: router.pathname,
      query: Object.fromEntries(searchParams),
    });
  };

  return (
    <S.RecruitmentStatusBar>
      <div className="tabs">
        {isLoading && <SkeletonUI.Tabs />}
        {!isLoading && (
          <>
            {data?.result &&
              Object.entries(data.result)
                .sort(([keyA], [keyB]) => {
                  if (keyA === 'ALL') return -1;
                  if (keyB === 'ALL') return 1;
                  return 0;
                })
                .map(([key, value]) => (
                  <button className="tabs__item" key={key} onClick={() => handleTabClick(key)}>
                    <motion.span
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        color: status.toUpperCase() === key ? '#333' : '#4e5968',
                        fontWeight: status.toUpperCase() === key ? '600' : '400',
                      }}
                    >
                      {recruitmentStatusWithAll[key as keyof typeof recruitmentStatusWithAll]}
                    </motion.span>
                    <motion.span className="tabs__item--count" animate={{ color: status.toUpperCase() === key ? '#333' : '#4e5968' }}>
                      {value}
                    </motion.span>
                    {status.toUpperCase() === key && <UserLine />}
                  </button>
                ))}
          </>
        )}
      </div>
      <Button
        label="공고 생성"
        variant="primary"
        width="90px"
        height="35px"
        fontSize="14px"
        onClick={() => router.push(path.EMPLOYER_RECRUITMENT_REGISTER)}
      />
    </S.RecruitmentStatusBar>
  );
}

const UserLine = styled.div`
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  border-bottom: 2px solid #333;
`;

const S = {
  RecruitmentStatusBar: styled.div`
    margin-bottom: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tabs {
      display: flex;
      height: 50px;
      width: fit-content;
      &__item {
        position: relative;
        cursor: pointer;
        padding: 0 20px;
        font-size: 14px;
        text-align: center;
        width: 100px;
        color: ${(props) => props.theme.colors.gray700};
        &--count {
          padding-left: 3px;
        }
      }
    }
  `,
};
