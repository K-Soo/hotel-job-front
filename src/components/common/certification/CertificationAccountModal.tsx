import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import { Post } from '@/apis';
import React from 'react';
import Icon from '@/icons/Icon';
import { useSetRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';
import Image from 'next/image';
import environment from '@/environment';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import IconDimmed from '@/components/common/IconDimmed';
import useCertification from '@/hooks/useCertification';

export default function CertificationAccountModal() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const setCertificationModalAtom = useSetRecoilState(certificationModalAtom);

  const { iframeUrl, isLoadingCertStart } = useCertification();

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
        const response = await Post.accountCertificationVerify(parsedData.payload);
        console.log('본인인증 검증 API : ', response);

        if (response.result.status === 'duplicate') {
          throw new Error('이미 본인인증이 완료된 계정입니다.');
        }
        // TODO - 휴대폰번호 중복 인증 방지
        // if (response.result.status === 'unavailable') {
        //   throw new Error('중복된 휴대폰 번호');
        // }

        await queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH_ME], refetchType: 'all' });
        await queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYER_ACCOUNT], refetchType: 'all' });
        setCertificationModalAtom({ isOpen: false });
        alert('본인 인증 완료');
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Error handling certification message:', error?.message);

      const errorMessage = error instanceof Error && error.message ? error.message : '인증 요청이 실패했습니다.';
      alert(errorMessage);
      setCertificationModalAtom({ isOpen: false });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', processCertificationMessage);

    return () => {
      window.removeEventListener('message', processCertificationMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCertStart || isLoading) {
    return (
      <Portal>
        <S.CertificationAccountModal>
          <S.Container>
            <div className="loading-box">
              <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
            </div>
          </S.Container>
        </S.CertificationAccountModal>
      </Portal>
    );
  }

  return (
    <Portal>
      <S.CertificationAccountModal>
        <S.Container>
          {iframeUrl && (
            <>
              <div className="header">
                <IconDimmed width="40px" height="40px">
                  <Icon name="CloseA24x24" width="24px" height="24px" onClick={() => setCertificationModalAtom({ isOpen: false })} />
                </IconDimmed>
              </div>
              <iframe src={iframeUrl} className="iframe" />
            </>
          )}
        </S.Container>
      </S.CertificationAccountModal>
    </Portal>
  );
}

const S = {
  CertificationAccountModal: styled.div`
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
      /* overflow: auto; */
      width: 100%;
      /* height: calc(100% - 50px); */
      height: 100%;
    }
  `,
};
