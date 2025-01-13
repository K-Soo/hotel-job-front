import styled from 'styled-components';
import RecruitmentRegisterBasicForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterBasicForm';
import RecruitmentRegisterManagerForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterManagerForm';
import RecruitmentRegisterWorkPlaceForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterWorkPlaceForm';
import RecruitmentRegisterJobConditionForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterJobConditionForm';
import RegisterInfoForm from '@/components/employerRecruitmentRegister/RegisterInfoForm';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import RecruitmentPolicy from '@/components/common/employer/RecruitmentPolicy';
import FormEditor from '@/components/common/form/FormEditor';
import { CreateRecruitmentForm } from '@/types';

interface EmployerRecruitmentRegisterProps {
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenBenefitsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenPreferencesModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function EmployerRecruitmentRegister({
  children,
  setIsOpenJobModal,
  setIsOpenBenefitsModal,
  setIsOpenPreferencesModal,
}: EmployerRecruitmentRegisterProps) {
  return (
    <S.EmployerRecruitmentRegister>
      <div className="register-container">
        <form className="register-container__form">
          <EmployerTemplateForm height="100%">
            <EmployerTemplateForm.SubTitle title="공고 기본 설정" size="large" id="basic" />

            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterBasicForm />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="모집내용" size="large" id="detail" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RegisterInfoForm setIsOpenJobModal={setIsOpenJobModal} setIsOpenPreferencesModal={setIsOpenPreferencesModal} />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="상세 모집내용" size="large" id="detail" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <FormEditor<CreateRecruitmentForm> name="content" />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="근무조건" size="large" id="condition" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterJobConditionForm setIsOpenBenefitsModal={setIsOpenBenefitsModal} />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="근무지 정보" size="large" id="place" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterWorkPlaceForm />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="인사담당자 정보" size="large" id="manager" />
            <EmployerTemplateForm.Content>
              <RecruitmentRegisterManagerForm />
            </EmployerTemplateForm.Content>

            <RecruitmentPolicy />
          </EmployerTemplateForm>
        </form>
        {children}
      </div>
    </S.EmployerRecruitmentRegister>
  );
}

const S = {
  EmployerRecruitmentRegister: styled.section`
    .register-container {
      margin: 0 auto;
      max-width: 1024px;
      width: 100%;
      display: flex;
      &__form {
        flex: 1;
      }
    }
  `,
};
