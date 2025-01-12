import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import { Get, Post } from '@/apis';
import React from 'react';
import Icon from '@/icons/Icon';
import { useSetRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';
import Image from 'next/image';
import environment from '@/environment';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';

export default function CertificationModal() {
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  const loadingState = isLoading || !iframeUrl;

  const setCertificationModalAtom = useSetRecoilState(certificationModalAtom);

  const buildUrlWithParams = (baseUrl: string, params: Record<string, any>) => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'url') {
        url.searchParams.append(key, value);
      }
    });
    return url.toString();
  };

  // fetch start certification
  const fetchStartCertification = async () => {
    setIsLoading(true);
    try {
      const response = await Post.certificationStart();
      console.log('인증요청 API : ', response);

      if (response.result.status !== 'success') {
        throw new Error('인증 요청에 실패했습니다.');
      }

      const iframeUrl = buildUrlWithParams(response.result.params.url, response.result.params);

      setIframeUrl(iframeUrl);
    } catch (error) {
      alert('인증 요청에 실패했습니다.');
      setCertificationModalAtom({ isOpen: false });
      console.error('Error starting certification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificationMessage = async (event: MessageEvent) => {
    if (event.origin !== environment.baseUrl) return;

    try {
      const parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (parsedData.type === 'CERTIFICATION_FAIL') {
        throw new Error();
      }

      if (parsedData.type === 'CERTIFICATION_SUCCESS') {
        const response = await Post.certificationVerify(parsedData.payload);
        console.log('본인인증 검증 API : ', response);

        if (response.result.status !== 'success') {
          throw new Error();
        }

        await queryClient.invalidateQueries({ queryKey: [queryKeys.USER_INFO], refetchType: 'all' });
        alert('본인 인증 완료');

        setCertificationModalAtom({ isOpen: false });
      }
    } catch (error) {
      alert('본인 인증 실패');
      setCertificationModalAtom({ isOpen: false });
      console.error('Error handling certification message:', error);
    }
  };

  React.useEffect(() => {
    fetchStartCertification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    window.addEventListener('message', handleCertificationMessage);

    return () => {
      window.removeEventListener('message', handleCertificationMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <S.CertificationModal>
        <S.Container>
          {loadingState && (
            <div className="loading-box">
              <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
            </div>
          )}
          {iframeUrl && (
            <>
              <div className="header">
                <Icon name="Close25x25" width="28px" height="28px" onClick={() => setCertificationModalAtom({ isOpen: false })} />
              </div>
              <iframe src={iframeUrl} className="iframe"></iframe>
            </>
          )}
        </S.Container>
      </S.CertificationModal>
    </Portal>
  );
}

const S = {
  CertificationModal: styled.div`
    z-index: 15;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.article`
    max-width: 450px;
    width: 100%;
    max-height: 700px;
    height: 100%;
    background-color: #ffffff;
    ${(props) => props.theme.media.mobile`
      width: 100%;
      max-height: 100%;
      height: 100%;
    `};
    .header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      padding: 0 10px;
    }
    .loading-box {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .iframe {
      /* overflow: auto; */
      width: 100%;
      /* height: calc(100% - 50px); */
      height: 100%;
    }
  `,
};
