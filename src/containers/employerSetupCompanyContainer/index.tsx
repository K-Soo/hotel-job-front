import React from 'react';
import EmployerSetupCompany from '@/components/employerSetupCompany';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { schema } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { BusinessForm, SignUpForm } from '@/types';
import FormDevTools from '@/components/common/FormDevTools';
import ManagerInfoForm from '@/components/employerSetupCompany/ManagerInfoForm';
import BusinessInfoForm from '@/components/employerSetupCompany/BusinessInfoForm';
import Button from '@/components/common/style/Button';

export default function EmployerSetupCompanyContainer() {
  const [step, setStep] = React.useState<'businessInfo' | 'managerInfo'>('businessInfo');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const methods = useForm<BusinessForm>({
    // resolver: yupResolver(schema.signUpSchema),
    disabled: disabled,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      businessRegistrationNumber: '',
      businessName: '',
      tradeName: '',
    },
  });

  const onSubmit: SubmitHandler<BusinessForm> = async (data) => {
    try {
    } catch (error) {
    } finally {
    }
  };

  const handleClickBusinessInfoForm = () => {
    setStep('managerInfo');
  };

  return (
    <FormProvider {...methods}>
      <EmployerSetupCompany onSubmit={onSubmit}>
        {step === 'businessInfo' && (
          <BusinessInfoForm>
            <Button label="다음" variant="primary" width="100px" height="40px" onClick={handleClickBusinessInfoForm} />
          </BusinessInfoForm>
        )}
        {step === 'managerInfo' && (
          <ManagerInfoForm>
            <Button
              label="이전"
              variant="secondary"
              width="100px"
              height="40px"
              onClick={() => setStep('businessInfo')}
              margin="0 15px 0 0"
            />
            <Button label="등록" variant="primary" width="100px" height="40px" onClick={handleClickBusinessInfoForm} />
          </ManagerInfoForm>
        )}
      </EmployerSetupCompany>
    </FormProvider>
  );
}
