import styled from 'styled-components';
import EmployerQuickMenu from '@/components/common/employer/EmployerQuickMenu';

interface EmployerProps {}

export default function Employer({}: EmployerProps) {
  return (
    <S.Employer>
      <EmployerQuickMenu />
    </S.Employer>
  );
}

const S = {
  Employer: styled.section``,
};
