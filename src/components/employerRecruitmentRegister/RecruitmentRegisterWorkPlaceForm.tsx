import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import Button from '@/components/common/style/Button';
import FormNumberInput from '@/components/common/form/FormNumberInput';

interface RecruitmentRegisterWorkPlaceFormProps {}

export default function RecruitmentRegisterWorkPlaceForm({}: RecruitmentRegisterWorkPlaceFormProps) {
  return (
    <S.RecruitmentRegisterWorkPlaceForm>
      <HorizontalFormWrapper label="객실수">
        <FormNumberInput<any> name="객실수" maxWidth="100px" unit="개" maxLength={4} />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<any> required label="기본주소" name="기본주소" placeholder="기본주소" maxWidth="500px" disabled />
        <Button label="검색" variant="primary" height="40px" width="100px" margin="0 0 0 15px" />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<any> required label="상세주소" name="상세주소" placeholder="상세주소" maxWidth="620px" />
      </HorizontalFormWrapper>
    </S.RecruitmentRegisterWorkPlaceForm>
  );
}

const S = {
  RecruitmentRegisterWorkPlaceForm: styled.div``,
};
