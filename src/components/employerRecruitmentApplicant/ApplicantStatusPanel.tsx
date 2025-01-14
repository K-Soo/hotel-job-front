import styled from 'styled-components';

interface ApplicantStatusPanelProps {}

export default function ApplicantStatusPanel({}: ApplicantStatusPanelProps) {
  return <S.ApplicantStatusPanel>지원자들</S.ApplicantStatusPanel>;
}

const S = {
  ApplicantStatusPanel: styled.div`
    border: 1px solid #000;
    height: 160px;
    margin-bottom: 50px;
  `,
};
