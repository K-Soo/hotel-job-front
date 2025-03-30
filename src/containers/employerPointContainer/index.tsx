import React from 'react';
import EmployerPayment from '@/components/employerPayment';
import SectionTitle from '@/components/common/employer/SectionTitle';
import SkeletonUI from '@/components/common/SkeletonUI';

// TODO - 포인트 내역 API 연동 후 주석 해제
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
