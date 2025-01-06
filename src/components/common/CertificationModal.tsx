import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import { Get, Post } from '@/apis';
import React from 'react';
import Icon from '@/icons/Icon';
import { useSetRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';
import Image from 'next/image';
import environment from '@/environment';

export default function CertificationModal() {
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const setCertificationModalAtom = useSetRecoilState(certificationModalAtom);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('event: ', event);
      // if (event.origin !== environment.baseUrl) {
      //   return;
      // }

      const data = JSON.parse(event.data);
      console.log('data: ', data);
      if (data.type === 'CERTIFICATION_SUCCESS') {
        alert('본인 인증에 성공했습니다.');
        // setCertificationModalAtom({ isOpen: false });
      }

      // if (event.data.success) {
      //   console.log(event.data.message);
      //   setCertificationModalAtom({ isOpen: false }); // 모달 닫기
      // }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const startCertification = async () => {
    setIsLoading(true);
    try {
      const response = await Post.startCertification();
      console.log('인증요청 API : ', response);

      if (response.result.status !== 'success') {
        alert('인증 요청에 실패했습니다.');
        setCertificationModalAtom({ isOpen: false });

        return;
      }

      const url = new URL(response.result.params.url);
      const params = response.result.params;

      Object.entries(params).forEach(([key, value]) => {
        if (key !== 'url') {
          url.searchParams.append(key, value);
        }
      });
      setIframeUrl(url.toString());
    } catch (error) {
      alert('인증 요청에 실패했습니다.');
      setCertificationModalAtom({ isOpen: false });
      console.error('Error starting certification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    startCertification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <S.CertificationModal>
        <S.Container>
          {isLoading && (
            <div className="loading-box">
              <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
            </div>
          )}
          {!isLoading && iframeUrl && (
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
