import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import { Post } from '@/apis';
import React from 'react';
import Icon from '@/icons/Icon';
import Image from 'next/image';
import environment from '@/environment';
import IconDimmed from '@/components/common/IconDimmed';
import useCertification from '@/hooks/useCertification';

interface CertificationVerifyModalProps {
  handleCloseModal: () => void;
  onCertificationSuccess: () => void;
}

export default function CertificationVerifyModal({ handleCloseModal, onCertificationSuccess }: CertificationVerifyModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const { iframeUrl, isLoadingCertStart } = useCertification();

  React.useEffect(() => {
    const processCertificationMessage = async (event: MessageEvent) => {
      setIsLoading(true);

      try {
        if (event.origin !== environment.baseUrl) {
          throw new Error('잘못된 요청 출처입니다. 올바른 경로에서 다시 시도해주세요.');
        }

        const parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (parsedData.type === 'CERTIFICATION_FAIL') {
          throw new Error('인증 요청이 실패했습니다. 다시 시도해주세요.');
        }

        if (parsedData.type === 'CERTIFICATION_SUCCESS') {
          const response = await Post.verifyIdentityMatch(parsedData.payload);
          console.log('본인인증 검증 API : ', response);

          if (response.result.status === 'failure') {
            throw new Error('계정 인증 정보와 일치하지 않습니다.');
          }

          onCertificationSuccess();
        }
      } catch (error: any) {
        console.error('Error:', error?.message);

        alert(error?.message || '인증 요청이 실패했습니다.');

        handleCloseModal();
      } finally {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', processCertificationMessage);

    return () => {
      window.removeEventListener('message', processCertificationMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCertStart || isLoading) {
    return (
      <Portal>
        <S.CertificationVerifyModal>
          <S.Container>
            <div className="loading-box">
              <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
            </div>
          </S.Container>
        </S.CertificationVerifyModal>
      </Portal>
    );
  }

  return (
    <Portal>
      <S.CertificationVerifyModal>
        <S.Container>
          {iframeUrl && (
            <>
              <div className="header">
                <IconDimmed width="40px" height="40px">
                  <Icon name="CloseA24x24" width="24px" height="24px" onClick={() => handleCloseModal()} />
                </IconDimmed>
              </div>
              <iframe src={iframeUrl} className="iframe" />
            </>
          )}
        </S.Container>
      </S.CertificationVerifyModal>
    </Portal>
  );
}

const S = {
  CertificationVerifyModal: styled.div`
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
    overflow: hidden;
    ${(props) => props.theme.media.mobile`
      width: 100%;
      min-height: 100%;
    `};
    .header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 60px;
      padding: 0 10px;
    }
    .loading-box {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .iframe {
      width: 100%;
      height: 100%;
    }
  `,
};
