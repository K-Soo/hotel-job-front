import styled from 'styled-components';
import EmployerTemplateForm from '@/components/common/employer/EmployerTemplateForm';
import FormInputB from '@/components/common/form/FormInputB';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import Button from '@/components/common/style/Button';
import { EmployerAccountInfoForm } from '@/types';
import { useFormContext } from 'react-hook-form';
import { certificationModalAtom } from '@/recoil/certification';
import { useSetRecoilState } from 'recoil';

interface EmployerAccountProps {}

export default function EmployerAccount({}: EmployerAccountProps) {
  const { watch } = useFormContext<EmployerAccountInfoForm>();
  const setCertificationModalAtomState = useSetRecoilState(certificationModalAtom);

  const certificationValue = watch('certification');

  return (
    <S.EmployerAccount>
      <EmployerTemplateForm height="100%">
        <EmployerTemplateForm.Title title="계정 정보 관리" />
        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="기본 정보" />

          <HorizontalFormWrapper>
            <FormInputB<EmployerAccountInfoForm> label="아이디" name="userId" placeholder="아이디" readOnly={true} />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<EmployerAccountInfoForm> label="닉네임" name="nickname" placeholder="닉네임" minWidth="auto" readOnly={true} />
            <Button label="변경" variant="tertiary" width="80px" height="40px" margin="0 0 0 15px" fontSize="14px" />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<EmployerAccountInfoForm> label="가입일" name="createdAt" placeholder="가입일" minWidth="auto" readOnly={true} />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>

        <EmployerTemplateForm.Content maxWidth="600px">
          <EmployerTemplateForm.SubTitle title="인증 정보" />

          <HorizontalFormWrapper position="relative">
            <FormInputB<EmployerAccountInfoForm> label="휴대폰" name="accountStatus" minWidth="auto" readOnly={true} />
            {!certificationValue && <S.PhoneCertTag>미 인증</S.PhoneCertTag>}

            <Button
              label="인증"
              variant="tertiary"
              width="80px"
              height="40px"
              margin="0 0 0 15px"
              fontSize="14px"
              onClick={() => setCertificationModalAtomState({ isOpen: true })}
            />
          </HorizontalFormWrapper>

          <HorizontalFormWrapper>
            <FormInputB<EmployerAccountInfoForm> label="이메일" name="accountStatus" placeholder="이메일" minWidth="auto" readOnly={true} />
            <Button label="변경" variant="tertiary" width="80px" height="40px" margin="0 0 0 15px" fontSize="14px" />
          </HorizontalFormWrapper>
        </EmployerTemplateForm.Content>
      </EmployerTemplateForm>
    </S.EmployerAccount>
  );
}

const S = {
  EmployerAccount: styled.section``,
  PhoneCertTag: styled.span`
    position: absolute;
    left: 170px;
    background-color: crimson;
    color: ${({ theme }) => theme.colors.white};
    padding: 2px 12px;
    height: 25px;
    border-radius: 15px;
    font-size: 13px;
    display: flex;
    align-items: center;
  `,
};
