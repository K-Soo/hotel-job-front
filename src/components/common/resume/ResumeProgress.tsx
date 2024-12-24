import styled from 'styled-components';

interface ResumeProgressProps {}

export default function ResumeProgress({}: ResumeProgressProps) {
  return <S.ResumeProgress>ResumeProgress</S.ResumeProgress>;
}

const S = {
  ResumeProgress: styled.div`
    position: sticky;
    top: 80px;
    width: 250px;
    height: 500px;
    margin-left: 30px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 8px;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
};
