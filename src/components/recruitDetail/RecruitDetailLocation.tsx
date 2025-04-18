import styled from 'styled-components';

interface RecruitDetailLocationProps {
  address: string;
  addressDetail: string;
}

// TODO - dropdown
export default function RecruitDetailLocation({ address, addressDetail }: RecruitDetailLocationProps) {
  return (
    <S.RecruitDetailLocation>
      <div>{address}</div>
      <div className="address-detail">{addressDetail}</div>
    </S.RecruitDetailLocation>
  );
}

const S = {
  RecruitDetailLocation: styled.div`
    margin-bottom: 10px;
    display: flex;
    .address-detail {
      padding-left: 5px;
    }
  `,
};
