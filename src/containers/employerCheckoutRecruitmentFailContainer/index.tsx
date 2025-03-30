import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

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
