import React from 'react';
import EmployerBusiness from '@/components/employerBusiness';
import EmployerBusinessFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessFormContainer';
import EmployerBusinessManagerFormContainer from '@/containers/employerBusinessContainer/EmployerBusinessManagerFormContainer';

// TODO: 리펙토링 및 기능 구현, API 호출
export default function EmployerBusinessContainer() {
  return (
    <EmployerBusiness>
      <EmployerBusinessFormContainer />
      <EmployerBusinessManagerFormContainer />
    </EmployerBusiness>
  );
}
