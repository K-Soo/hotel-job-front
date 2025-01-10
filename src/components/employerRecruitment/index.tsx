import styled from 'styled-components';

interface EmployerRecruitmentProps {
  children: React.ReactNode;
}

export default function EmployerRecruitment({ children }: EmployerRecruitmentProps) {
  return <S.EmployerRecruitment>{children}</S.EmployerRecruitment>;
}

const S = {
  EmployerRecruitment: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};
