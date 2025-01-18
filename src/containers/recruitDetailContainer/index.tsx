import React from 'react';
import RecruitDetail from '@/components/recruitDetail';
import { Get, Post } from '@/apis';
import useFetchQuery from '@/hooks/useFetchQuery';
import queryKeys from '@/constants/queryKeys';
import { useRouter } from 'next/router';
import RecruitDetailSideMenu from '@/components/recruitDetail/RecruitDetailSideMenu';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import RecruitDetailApplyResumeForm from '@/components/recruitDetail/RecruitDetailApplyResumeForm';
import Button from '@/components/common/style/Button';

export default function RecruitDetailContainer() {
  const [isOpenApplyForm, setIsOpenApplyForm] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.RECRUIT_DETAIL, { slug }],
    queryFn: Get.recruitDetail,
    options: {
      enabled: !!slug,
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  const handleClickApply = React.useCallback(() => {
    if (!isAuthenticated) {
      return addToast({ message: '로그인 후 이용해주세요.', type: 'info' });
    }
    setIsOpenApplyForm((prev) => !prev);
  }, [isAuthenticated]);

  const fetchSubmitApply = async () => {
    try {
      const response = await Post.applyResume({});
    } catch (error) {}
  };

  console.log('채용공고 상세 API : ', data);

  // TODO - Loading
  if (isLoading) {
    return <div>isLoading</div>;
  }

  if (isSuccess && data) {
    return (
      <RecruitDetail data={data.result}>
        <RecruitDetailSideMenu managerName={data.result.managerName} managerNumber={data.result.managerNumber}>
          {!isOpenApplyForm && (
            <Button label="지원하기" variant="primary" height="50px" borderRadius="10px" onClick={handleClickApply} fontSize="18px" />
          )}
          {isOpenApplyForm && <RecruitDetailApplyResumeForm setIsOpenApplyForm={setIsOpenApplyForm} isOpenApplyForm={isOpenApplyForm} />}
        </RecruitDetailSideMenu>
      </RecruitDetail>
    );
  }
}
