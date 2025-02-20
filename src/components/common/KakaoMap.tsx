import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import environment from '@/environment';

interface KakaoMapProps {
  address: string;
  addressDetail: string;
}

function KakaoMap({ address, addressDetail }: KakaoMapProps) {
  const [position, setPosition] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isErrorCoordinates, setIsErrorCoordinates] = React.useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: environment.kakaoJavascriptKKey,
    libraries: ['services', 'clusterer'],
  });
  console.log('loading: ', loading);

  React.useEffect(() => {
    if (loading || !window.kakao || !address) return;

    const geocoder = new kakao.maps.services.Geocoder();
    const fullAddress = `${address}`;

    geocoder.addressSearch(fullAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { y, x } = result[0];
        setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        setIsErrorCoordinates(false);
        console.error('주소 변환 실패:', status);
      }
    });
  }, [address, loading]);

  if (loading || position === null) return <></>;

  if (error || isErrorCoordinates) {
    return null;
  }

  return (
    <S.KakaoMap>
      <Map center={position} style={{ width: '100%', height: '100%' }} draggable={true} zoomable={false}>
        <MapMarker position={position} />
      </Map>
    </S.KakaoMap>
  );
}

export default React.memo(KakaoMap);

const S = {
  KakaoMap: styled.div`
    height: 250px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 10px;
    overflow: hidden;
    ${(props) => props.theme.media.mobile`
      height: 180px;
    `};
  `,
};
