import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';

interface EmployerAccountResetProps {
  children: React.ReactNode;
}

export default function EmployerAccountReset({ children }: EmployerAccountResetProps) {
  return (
    <S.EmployerAccountReset>
      <article className="reset-container">
        <SectionTitle title="비밀번호 변경" margin="0 0 60px 0" textAlignment="center" />
        {children}
      </article>
    </S.EmployerAccountReset>
  );
}

const S = {
  EmployerAccountReset: styled.section`
    .reset-container {
      margin: 0 auto;
      max-width: 550px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `,
};
