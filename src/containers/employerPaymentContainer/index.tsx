import React from 'react';
import EmployerPayment from '@/components/employerPayment';
import SectionTitle from '@/components/common/employer/SectionTitle';
import { Get } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import useFetchQuery from '@/hooks/useFetchQuery';
import { keepPreviousData } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import EmployerPaymentTable from '@/components/employerPayment/EmployerPaymentTable';
import PaymentDetailForm from '@/components/employerPayment/PaymentDetailForm';
import dynamic from 'next/dynamic';
import Modal from '@/components/common/modal';
import { EmployerPaymentItem } from '@/types';
import SkeletonUI from '@/components/common/SkeletonUI';

const DynamicNoSSRModal = dynamic(() => import('@/components/common/modal'), { ssr: false });

interface Query extends ParsedUrlQuery {
  slug: string;
}

export default function EmployerPaymentContainer() {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState<EmployerPaymentItem | null>(null);

  const router = useRouter();
  const { slug } = router.query as Query;

  const { data, isLoading, isSuccess } = useFetchQuery({
    queryKey: [queryKeys.PAYMENT_LIST].filter(Boolean),
    queryFn: Get.getEmployerPaymentList,
    options: {
      throwOnError: false,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 10,
      placeholderData: keepPreviousData,
    },
    requestQuery: {
      id: slug as string,
    },
  });

  console.log('상품 결제 내역 API : ', data);

  const handleCloseJobModal = React.useCallback(() => {
    setIsOpenModal(false);
    setSelectedPayment(null);
  }, []);

  const handleClickPaymentItem = React.useCallback((payment: EmployerPaymentItem) => {
    setSelectedPayment(payment);
    setIsOpenModal(true);
  }, []);

  if (isLoading) {
    return (
      <EmployerPayment>
        <SectionTitle title="상품 결제내역" />
        {isLoading && <SkeletonUI.Document />}
      </EmployerPayment>
    );
  }

  if (isSuccess && data) {
    return (
      <>
        {isOpenModal && selectedPayment && (
          <DynamicNoSSRModal handleCloseModal={handleCloseJobModal}>
            <Modal.Header title="상세정보" handleCloseModal={handleCloseJobModal} />
            <Modal.Content padding="0">
              <PaymentDetailForm selectedPayment={selectedPayment} />
            </Modal.Content>
          </DynamicNoSSRModal>
        )}

        <EmployerPayment>
          <SectionTitle title="상품 결제내역" />
          <EmployerPaymentTable>
            <EmployerPaymentTable.Header />
            <EmployerPaymentTable.Body data={data.result} handleClickPaymentItem={handleClickPaymentItem} />
          </EmployerPaymentTable>
        </EmployerPayment>
      </>
    );
  }
}
