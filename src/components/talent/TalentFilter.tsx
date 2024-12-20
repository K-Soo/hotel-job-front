import styled from 'styled-components';

interface TalentFilterProps {}

export default function TalentFilter({}: TalentFilterProps) {
  return <S.TalentFilter>TalentFilter</S.TalentFilter>;
}

const S = {
  TalentFilter: styled.div`
    border: 1px solid #000;
    position: sticky;
    top: 45px;
    flex-basis: 300px;
    height: 100%;
    margin-right: 15px;
  `,
};
