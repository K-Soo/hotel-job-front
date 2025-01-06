import { Post } from '@/apis';
import { useRouter } from 'next/router';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';
import Icon from '@/icons/Icon';

export interface Query extends ParsedUrlQuery {
  up_hash: string;
  kcp_merchant_time: string;
  kcp_cert_lib_ver: string;
  ordr_idxx: string;
  req_tx: string;
  cert_method: string;
  web_siteid: string;
  site_cd: string;
  Ret_URL: string;
  cert_otp_use: string;
  cert_enc_use_ext: string;
  res_cd: string;
  web_siteid_hashYN: string;
  param_opt_1: string;
  param_opt_2: string;
  param_opt_3: string;
  kcp_page_submit_yn: string;
  url: string;
  redirectUrl: string;
}

export default function CertificationPage() {
  const router = useRouter();
  const query = router.query as Query;
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);

  const handleClose = () => {
    alert('본인 인증이 취소되었습니다.');
    router.push(query.redirectUrl ?? '/');
  };

  React.useEffect(() => {
    // if (Object.keys(query).length > 0 && query.url) {
    //   // URL 생성 및 쿼리 파라미터 추가
    //   const url = new URL(query.url);
    //   Object.keys(query).forEach((key) => {
    //     if (key !== 'url' && key !== 'redirectUrl') {
    //       url.searchParams.append(key, query[key] as string);
    //     }
    //   });
    //   setIframeUrl(url.toString());
    // }
  }, [query]);

  // React.useEffect(() => {
  //   if (Object.keys(query).length > 0) {
  //     // 백엔드에서 받은 URL로 인증 요청
  //     const form = document.createElement('form');
  //     form.method = 'POST';
  //     form.action = query.url; // 백엔드에서 받은 인증 URL

  //     // 쿼리 파라미터를 폼 필드로 추가
  //     Object.keys(query).forEach((key) => {
  //       if (key !== 'url') {
  //         const value = query[key];

  //         const input = document.createElement('input');
  //         input.type = 'hidden';
  //         input.name = key;
  //         input.value = Array.isArray(value) ? value.join(',') : value || '';
  //         form.appendChild(input);
  //       }
  //     });

  //     document.body.appendChild(form);
  //     form.submit();
  //     document.body.removeChild(form);
  //   }
  // }, [query]);

  if (!iframeUrl) {
    return null;
  }

  return (
    <>
      <IframeContainer>
        <CloseButton onClick={handleClose}>
          <Icon name="CloseA24x24" width="34px" height="34px" />
        </CloseButton>
        <StyledIframe src={iframeUrl} title="Certification"></StyledIframe>
      </IframeContainer>
    </>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.div`
  padding: 10px 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  height: 50px;
  border: 1px solid #e0e0e0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  svg {
    color: #000;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 400px;
  height: calc(100vh - 50px);
  border: none;
`;
