import styled from 'styled-components';
import RecruitDetailLocation from '@/components/recruitDetail/RecruitDetailLocation';
import RecruitDetailPeriod from '@/components/recruitDetail/RecruitDetailPeriod';
import RecruitDetailDateTime from '@/components/recruitDetail/RecruitDetailDateTime';
import RecruitDetailJobInformation from '@/components/recruitDetail/RecruitDetailJobInformation';
import RecruitDetailFavoriteShareBar from '@/components/recruitDetail/RecruitDetailFavoriteShareBar';
import { IRecruitDetail } from '@/types';
import KakaoMap from '@/components/common/KakaoMap';
import dynamic from 'next/dynamic';

const DynamicKakaoMap = dynamic(() => import('@/components/common/KakaoMap'), { ssr: false });

interface RecruitDetailProps {
  data: IRecruitDetail;
}

export default function RecruitDetail({ data }: RecruitDetailProps) {
  const locationData = {
    address: data.address,
    addressDetail: data.addressDetail,
  };

  return (
    <S.RecruitDetail>
      <RecruitDetailDateTime />
      <RecruitDetailFavoriteShareBar />

      <S.Header>
        <div className="left">
          <div className="left__company">{data.hotelName}</div>
          <div className="left__title">{data.recruitmentTitle}</div>
        </div>
      </S.Header>

      <S.Title>상세 정보</S.Title>
      <RecruitDetailJobInformation />

      <S.Title>상세 정보</S.Title>
      <S.Content>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </S.Content>

      <S.Title>접수기간 및 담당자</S.Title>
      <RecruitDetailPeriod />

      <S.Title>근무 위치</S.Title>
      <RecruitDetailLocation />
      <DynamicKakaoMap address={data.address} addressDetail={data.addressDetail} />
    </S.RecruitDetail>
  );
}

const S = {
  RecruitDetail: styled.section``,
  Images: styled.article`
    height: 350px;
    border-radius: 15px;
    background-color: gray;
    margin-bottom: 30px;
  `,

  Header: styled.article`
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    margin-bottom: 50px;
    .left {
      &__company {
        font-size: 18px;
        color: #333;
        font-weight: 500;
        margin-bottom: 5px;
      }
      &__title {
        font-size: 28px;
        font-weight: 600;
      }
    }
  `,
  Content: styled.article`
    min-height: 500px;
    margin-bottom: 50px;
  `,

  Title: styled.article`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  `,
};
