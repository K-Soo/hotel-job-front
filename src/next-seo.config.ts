import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: `%s  - 호텔잡, 숙박업, 호텔업, 모텔, 파출, 구인 구직`,
  defaultTitle: '호텔잡 - 숙박업, 호텔업, 모텔, 파출, 구인 구직',
  description: '호텔업, 숙박업 종사자를 위한 채용 정보! 지배인, 당번, 모텔, 캐셔, 부부팀, 파출, 구인 구직 정보를 한곳에서 만나보세요.',
  canonical: 'https://www.hotel-job-connect.com',
  //true 이면 검색 엔진이 페이지를 인덱싱하지 않음 (robots noindex 태그 추가)
  // noindex: false,
  // true 이면 페이지 내 링크를 검색 엔진이 따라가지 않음 (robots nofollow 태그 추가)
  // nofollow: false,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.hotel-job-connect.com',
    siteName: '호텔잡 - - 숙박업, 호텔업, 모텔, 파출 채용정보 매칭 플랫폼',
    images: [
      {
        url: `https://d2pw36ijlx16fz.cloudfront.net/file/logo/walaland_og.jpeg`,
        width: 285,
        height: 167,
        alt: '이미지',
      },
    ],
  },
};

export default config;
