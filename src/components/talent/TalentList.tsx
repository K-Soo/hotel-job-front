import styled from 'styled-components';

interface TalentListProps {}

export default function TalentList({}: TalentListProps) {
  return (
    <S.TalentList>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore eos est ipsam inventore consequuntur rerum laborum modi omnis in
        sed, distinctio facere, ipsum consectetur error nam unde? Quas, suscipit rerum?
      </p>
    </S.TalentList>
  );
}

const S = {
  TalentList: styled.div`
    width: 100%;
    p {
      font-size: 20px;
      height: 300px;
      border: 1px solid #000;
    }
  `,
};
