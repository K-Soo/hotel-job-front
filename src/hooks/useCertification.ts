import React from 'react';
import { Post } from '@/apis';
import { useSetRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';
import { appendQueryParams } from '@/utils';

export default function useCertification() {
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const [isLoadingCertStart, setIsLoadingCertStart] = React.useState(false);

  const setCertificationModalAtom = useSetRecoilState(certificationModalAtom);

  // API - start certification
  const fetchStartCertification = async () => {
    setIsLoadingCertStart(true);
    try {
      const response = await Post.certificationStart();
      console.log('초기 인증요청 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error('인증 요청에 실패했습니다.');
      }

      const iframeUrl = appendQueryParams(response.result.params.url, response.result.params);

      setIframeUrl(iframeUrl);
    } catch (error) {
      alert('인증 요청에 실패했습니다.');
      setCertificationModalAtom({ isOpen: false });
      console.error('Error starting certification:', error);
    } finally {
      setIsLoadingCertStart(false);
    }
  };

  React.useEffect(() => {
    fetchStartCertification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { iframeUrl, isLoadingCertStart };
}
