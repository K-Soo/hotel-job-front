import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';

interface EmployerAccountResetProps {
  children: React.ReactNode;
}

export default function EmployerAccountReset({ children }: EmployerAccountResetProps) {
  return (
    <S.EmployerAccountReset>
      <article className="reset-container">
        <SectionTitle title="비밀번호 변경" margin="0 0 15px 0" />
        {children}
      </article>
    </S.EmployerAccountReset>
  );
}

const S = {
  EmployerAccountReset: styled.section`
    .reset-container {
      margin: 0 auto;
      max-width: 450px;
      /* border: 1px solid red; */
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      /* align-items: center; */
    }
  `,
};
