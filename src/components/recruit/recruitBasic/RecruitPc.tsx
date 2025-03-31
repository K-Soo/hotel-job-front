import styled from 'styled-components';

interface RecruitPcProps {
  children: React.ReactNode;
}

export default function RecruitPc({ children }: RecruitPcProps) {
  return <S.RecruitPc>{children}</S.RecruitPc>;
}

const S = {
  RecruitPc: styled.div`
    ${(props) => props.theme.media.laptop`
      padding: 0 15px;
    `};
  `,
};
