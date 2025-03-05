import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

interface useFetchApplyCheckProps {
  recruitmentId: string | undefined;
}

export default function useFetchApplyCheck({ recruitmentId }: useFetchApplyCheckProps) {
  const router = useRouter();

  const { isAuthenticated, role, authAtomState } = useAuth();

  const {
    data: applyCheckData,
    isLoading: isApplyCheckLoading,
    isError: isApplyCheckError,
  } = useFetchQuery({
    queryKey: [queryKeys.APPLICATION_APPLY_CHECK, { slug: recruitmentId, role, nickName: authAtomState.nickname }],
    queryFn: Get.applicationApplyCheck,
    options: {
      enabled: !!recruitmentId && isAuthenticated && role === 'JOB_SEEKER' && !!router.query.slug,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    requestQuery: {
      id: recruitmentId as string,
    },
  });

  console.log('지원가능 체크 API : ', applyCheckData);

  return {
    applyCheckData,
    isApplyCheckLoading,
    isApplyCheckError,
  };
}
