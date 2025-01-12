import styled from 'styled-components';
import HorizontalFormWrapper from '@/components/common/form/HorizontalFormWrapper';
import FormInputB from '@/components/common/form/FormInputB';
import Button from '@/components/common/style/Button';
import FormNumberInput from '@/components/common/form/FormNumberInput';
import { CreateRecruitmentForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';

export default function RecruitmentRegisterWorkPlaceForm() {
  const setDaumPostAtom = useSetRecoilState(daumPostAtom);

  return (
    <S.RecruitmentRegisterWorkPlaceForm>
      <HorizontalFormWrapper label="객실수">
        <FormNumberInput<CreateRecruitmentForm> name="locationInfo.roomCount" maxWidth="100px" unit="개" maxLength={4} isComma />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm> required label="기본주소" name="locationInfo.address" placeholder="기본주소" disabled />
        <Button
          label="검색"
          variant="primary"
          height="40px"
          width="100px"
          margin="0 0 0 15px"
          onClick={() => setDaumPostAtom({ isOpen: true })}
        />
      </HorizontalFormWrapper>

      <HorizontalFormWrapper>
        <FormInputB<CreateRecruitmentForm> required label="상세주소" name="locationInfo.addressDetail" placeholder="상세주소" />
      </HorizontalFormWrapper>
    </S.RecruitmentRegisterWorkPlaceForm>
  );
}

const S = {
  RecruitmentRegisterWorkPlaceForm: styled.div``,
};
