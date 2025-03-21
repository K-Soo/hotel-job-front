import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: `%s  - 호텔잡, 숙박업, 호텔업, 모텔, 파출, 구인 구직`,
  defaultTitle: '호텔잡 - 숙박업, 호텔업, 모텔, 파출, 구인 구직',
  description: '호텔업, 숙박업 종사자를 위한 채용 정보! 지배인, 당번, 모텔, 캐셔, 부부팀, 파출, 구인 구직 정보를 한곳에서 만나보세요.',
  canonical: 'https://www.hotel-job-connect.com',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.hotel-job-connect.com',
    siteName: '호텔잡 - - 숙박업, 호텔업, 모텔, 파출 채용정보 매칭 플랫폼',
    // images: [
    //   {
    //     url: ``,
    //     width: 285,
    //     height: 167,
    //     alt: '이미지',
    //   },
    // ],
  },
};

export default config;
