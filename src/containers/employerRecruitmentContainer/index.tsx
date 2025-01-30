import React from 'react';
import EmployerRecruitment from '@/components/employerRecruitment';
import RecruitmentStatusBar from '@/components/employerRecruitment/RecruitmentStatusBar';
import Button from '@/components/common/style/Button';
import RecruitmentListContainer from '@/containers/employerRecruitmentContainer/RecruitmentListContainer';
import SectionTitle from '@/components/common/employer/SectionTitle';
import { ErrorComponent, ErrorBoundary } from '@/error';
import useAlertWithConfirm from '@/hooks/useAlertWithConfirm';
import useToast from '@/hooks/useToast';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Post } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import path from '@/constants/path';
import axios from 'axios';
interface Query extends ParsedUrlQuery {
  page?: string;
}

export default function EmployerRecruitmentContainer() {
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);

  const { setAlertWithConfirmAtom } = useAlertWithConfirm();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { page } = router.query as Query;

  const { addToast } = useToast();

  React.useEffect(() => {
    setCheckedItems([]);
  }, [page]);

  const handleClickCheckBoxItem = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedItems((prev) => [...prev, name]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== name));
    }
  }, []);

  const fetchDeleteRecruitment = async () => {
    if (checkedItems.length === 0) {
      return addToast({ type: 'error', message: '삭제할 공고를 선택해주세요.' });
    }
    setAlertWithConfirmAtom((prev) => ({
      ...prev,
      type: 'CONFIRM',
      title: 'TITLE_4',
      subTitle: 'DESC_4',
      cancelLabel: '취소',
      confirmLabel: '삭제',
      onClickCancel: () => setCheckedItems([]),
      onClickConfirm: () => fetchRemoveRecruitment(),
    }));
  };

  const fetchRemoveRecruitment = async () => {
    try {
      const response = await Post.removeRecruitment({ ids: checkedItems });
      console.log('공고 삭제 API : ', response);
      if (response.result.status !== 'success') {
        throw new Error();
      }
      await queryClient.invalidateQueries({ queryKey: [queryKeys.RECRUITMENT_STATUS], refetchType: 'all' });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.RECRUITMENT_LIST],
        refetchType: 'all',
      });
      router.replace(path.EMPLOYER_RECRUITMENT);
      addToast({ type: 'info', message: '삭제가 완료되었습니다.' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.error?.code;
        if (errorCode === 'ERR-4001') {
          addToast({ type: 'error', message: '진행중인 공고는 삭제할 수 없습니다.' });
        }
      }
      alert('삭제 중 문제가 발생했습니다. 문제가 지속되면 관리자에게 문의하세요.');
    } finally {
      setCheckedItems([]);
    }
  };

  return (
    <EmployerRecruitment>
      <div>
        <SectionTitle title="공고 목록" />
        <RecruitmentStatusBar />
        <div style={{ display: 'flex', margin: '20px 0' }}>
          <Button label="공고 삭제" variant="tertiary" width="90px" height="35px" fontSize="14px" onClick={fetchDeleteRecruitment} />
        </div>
      </div>

      <ErrorBoundary fallback={<ErrorComponent height="100%" />}>
        <RecruitmentListContainer handleClickCheckBoxItem={handleClickCheckBoxItem} checkedItems={checkedItems} />
      </ErrorBoundary>
    </EmployerRecruitment>
  );
}
