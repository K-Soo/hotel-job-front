import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import environment from '@/environment';

interface KakaoMapProps {
  address: string;
  addressDetail: string;
}

export default function KakaoMap({ address, addressDetail }: KakaoMapProps) {
  const [position, setPosition] = React.useState({ lat: 33.55635, lng: 126.795841 });
  const [isErrorCoordinates, setIsErrorCoordinates] = React.useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: environment.kakaoJavascriptKKey,
    libraries: ['services', 'clusterer'],
  });

  React.useEffect(() => {
    if (!window.kakao || !address) return;

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
  }, [address, addressDetail]);

  if (loading) return <></>;

  if (error || isErrorCoordinates) {
    return null;
  }

  return (
    <S.KakaoMap>
      <Map center={position} style={{ width: '100%', height: '100%' }}>
        <MapMarker position={position} />
      </Map>
    </S.KakaoMap>
  );
}

const S = {
  KakaoMap: styled.div`
    height: 360px;
  `,
};
