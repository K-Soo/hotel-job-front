import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import { queryKeyChecker } from '@/utils';

interface Query extends ParsedUrlQuery {
  code?: string;
  message?: 'PAY_PROCESS_CANCELED' | 'REJECT_CARD_COMPANY' | 'PAY_PROCESS_ABORTED';
}

export default function EmployerCheckoutRecruitmentFailContainer() {
  const router = useRouter();
  const { code, message } = router.query as Query;

  React.useEffect(() => {
    if (router.isReady) {
      try {
      } catch (error) {}
    }
  }, [router]);

  return <>index</>;
}
