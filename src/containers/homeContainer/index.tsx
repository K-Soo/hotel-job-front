import React from 'react';
import Home from '@/components/home';
import RecruitSearchPanel from '@/components/common/RecruitSearchPanel';
import { Get } from '@/apis';

export default function HomeContainer() {
  React.useEffect(() => {
    (async () => {
      try {
        const response = await Get.getHealth();
        console.log('health api : ', response);
      } catch (error) {
        console.log('error: ', error);
      }
    })();
  }, []);
  return (
    <Home>
      <RecruitSearchPanel />
    </Home>
  );
}
