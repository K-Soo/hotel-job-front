import React from 'react';
import styled from 'styled-components';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import environment from '@/environment';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
interface KakaoMapProps {
  address: string;
}

function KakaoMap({ address }: KakaoMapProps) {
  const [position, setPosition] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isErrorCoordinates, setIsErrorCoordinates] = React.useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: environment.kakaoJavascriptKKey,
    libraries: ['services', 'clusterer'],
  });

  const handleOpenKakaoMap = () => {
    if (!address) return;
    const encodedAddress = encodeURIComponent(address);
    const kakaoMapUrl = `https://map.kakao.com/?q=${encodedAddress}`;
    window.open(kakaoMapUrl, '_blank');
  };

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
      <S.KakaoMapWrapper>
        <Map center={position} style={{ width: '100%', height: '100%' }} draggable={true} zoomable={false}>
          <MapMarker position={position} />
        </Map>
      </S.KakaoMapWrapper>
      <S.SearchMap>
        <Icon name="LocationA24x24" width="20px" height="20px" margin="0 5px 0 0" />
        <motion.button className="fast" onClick={() => handleOpenKakaoMap()}>
          빠른 길 찾기
        </motion.button>
      </S.SearchMap>
    </S.KakaoMap>
  );
}

export default React.memo(KakaoMap);

const S = {
  KakaoMap: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-radius: 10px;
  `,
  KakaoMapWrapper: styled.div`
    height: 250px;
    overflow: hidden;
    border-radius: inherit;

    ${(props) => props.theme.media.mobile`
      height: 180px;
    `};
  `,
  SearchMap: styled.div`
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    .fast {
      color: ${({ theme }) => theme.colors.gray700};
      font-size: 14px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: underline;
      }
    }
  `,
};
