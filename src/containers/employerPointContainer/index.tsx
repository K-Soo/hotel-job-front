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

export default function EmployerPointContainer() {
  if (true) {
    return (
      <EmployerPayment>
        <SectionTitle title="포인트" />
        {true && <SkeletonUI.Document />}
      </EmployerPayment>
    );
  }

  return <>index</>;
}
