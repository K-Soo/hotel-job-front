import styled from 'styled-components';
import RecruitmentRegisterProgressMenu from '@/components/employerRecruitmentRegister/RecruitmentRegisterProgressMenu';
import RecruitmentRegisterBasicForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterBasicForm';
import RecruitmentDetailBasicForm from '@/components/employerRecruitmentDetail/RecruitmentDetailBasicForm';
import RecruitmentRegisterManagerForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterManagerForm';
import RecruitmentRegisterWorkPlaceForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterWorkPlaceForm';
import RecruitmentRegisterJobConditionForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterJobConditionForm';
import RecruitmentRegisterDetailForm from '@/components/employerRecruitmentRegister/RecruitmentRegisterDetailForm';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import RecruitmentPolicy from '@/components/common/employer/RecruitmentPolicy';
import dynamic from 'next/dynamic';

const DynamicFormEditor = dynamic(() => import('@/components/common/form/FormEditor'), { ssr: false });

interface EmployerRecruitmentDetailProps {
  setIsOpenJobModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function EmployerRecruitmentDetail({ children, setIsOpenJobModal }: EmployerRecruitmentDetailProps) {
  return (
    <S.EmployerRecruitmentDetail>
      <div className="detail-container">
        <form className="detail-container__form">
          <EmployerTemplateForm height="100%">
            <EmployerTemplateForm.SubTitle title="공고 기본 설정" size="large" id="basic" />

            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentDetailBasicForm />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="모집내용" size="large" id="detail" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterDetailForm setIsOpenJobModal={setIsOpenJobModal} />
            </EmployerTemplateForm.Content>

            {/* <EmployerTemplateForm.SubTitle title="상세 모집내용" size="large" id="detail" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <DynamicFormEditor />
            </EmployerTemplateForm.Content> */}

            {/* <EmployerTemplateForm.SubTitle title="근무조건" size="large" id="condition" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterJobConditionForm />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="근무지 정보" size="large" id="place" />
            <EmployerTemplateForm.Content marginBottom="80px">
              <RecruitmentRegisterWorkPlaceForm />
            </EmployerTemplateForm.Content>

            <EmployerTemplateForm.SubTitle title="인사담당자 정보" size="large" id="manager" />
            <EmployerTemplateForm.Content>
              <RecruitmentRegisterManagerForm />
            </EmployerTemplateForm.Content> */}

            <RecruitmentPolicy />
          </EmployerTemplateForm>
        </form>
        {children}
      </div>
    </S.EmployerRecruitmentDetail>
  );
}

const S = {
  EmployerRecruitmentDetail: styled.section`
    .detail-container {
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
