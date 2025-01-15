import React from 'react';
import RecruitDetail from '@/components/recruitDetail';
import { Get } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';

export default function RecruitDetailContainer() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUIT_DETAIL],
    queryFn: Get.recruitDetail,
    options: {
      enabled: !!slug,
    },
    requestQuery: {
      id: slug as string,
    },
  });
  console.log('채용공고 상세 API : ', data);

  if (isLoading) {
    return <div>ladoing</div>;
  }

  if (isSuccess && data) {
    return <RecruitDetail data={data.result} />;
  }
}
