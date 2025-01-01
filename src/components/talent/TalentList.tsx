import styled from 'styled-components';

interface TalentListProps {}

export default function TalentList({}: TalentListProps) {
  return (
    <S.TalentList>
      <p></p>
    </S.TalentList>
  );
}

const S = {
  TalentList: styled.div`
    width: 100%;
    p {
      font-size: 20px;
      height: 300px;
      /* border: 1px solid #000; */
    }
  `,
};
