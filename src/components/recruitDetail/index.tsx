import styled from 'styled-components';
import RecruitDetailLocation from '@/components/recruitDetail/RecruitDetailLocation';
import RecruitDetailPeriod from '@/components/recruitDetail/RecruitDetailPeriod';
import RecruitDetailDateTime from '@/components/recruitDetail/RecruitDetailDateTime';
import RecruitDetailJobInformation from '@/components/recruitDetail/RecruitDetailJobInformation';
import RecruitDetailFavoriteShareBar from '@/components/recruitDetail/RecruitDetailFavoriteShareBar';
import RecruitDetailContent from '@/components/recruitDetail/RecruitDetailContent';
import { IRecruitDetail } from '@/types';
import dynamic from 'next/dynamic';

const DynamicKakaoMap = dynamic(() => import('@/components/common/KakaoMap'), { ssr: false });

interface RecruitDetailProps {
  data: IRecruitDetail;
  children: React.ReactNode;
}

export default function RecruitDetail({ data, children }: RecruitDetailProps) {
  return (
    <S.RecruitDetail>
      {/* TODO - 업체 이미지 */}
      {/* <S.Images></S.Images> */}
      <div className="detail-container">
        <div className="detail-container__content-form">
          <RecruitDetailDateTime />

          <S.UtilPanel>
            <strong className="hotel-name">{data.hotelName}</strong>
            <RecruitDetailFavoriteShareBar />
          </S.UtilPanel>

          <S.Header>
            <h1 className="title">{data.recruitmentTitle}</h1>
          </S.Header>

          <S.Title>공고 정보</S.Title>
          <RecruitDetailJobInformation />

          <S.Title>상세 내용</S.Title>
          <RecruitDetailContent content={data.content} />

          <RecruitDetailPeriod managerEmail={data.managerEmail} managerName={data.managerName} managerNumber={data.managerNumber} />

          <S.Title>근무지 위치</S.Title>
          <RecruitDetailLocation address={data.address} addressDetail={data.addressDetail} />
          <DynamicKakaoMap address={data.address} addressDetail={data.addressDetail} />
        </div>
        {children}
      </div>
    </S.RecruitDetail>
  );
}

const S = {
  RecruitDetail: styled.section`
    .detail-container {
      display: flex;
      &__content-form {
        flex: 1 1 100%;
      }
    }
  `,
  Images: styled.article`
    height: 350px;
    border-radius: 15px;
    background-color: gray;
    margin-bottom: 30px;
  `,
  Header: styled.article`
    /* display: flex; */
    /* justify-content: space-between; */
    /* border: 1px solid red; */
    .title {
      font-size: 24px;
      font-weight: 500;
    }
    margin-bottom: 50px;
  `,
  Content: styled.article`
    min-height: 500px;
    margin-bottom: 50px;
  `,
  Title: styled.h2`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 15px;
  `,
  UtilPanel: styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 5px;
    .hotel-name {
      font-size: 18px;
      font-weight: 500;
    }
  `,
};
