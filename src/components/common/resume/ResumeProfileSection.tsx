import styled from 'styled-components';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';
import FormInput from '@/components/common/form/FormInput';
import Line from '@/components/common/Line';
import Button from '@/components/common/style/Button';
import { ResumeDetailForm, ResumeRegisterForm, ResumeStatusKey } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';
import { useFormContext } from 'react-hook-form';

interface ResumeProfileSectionProps {
  status: ResumeStatusKey;
}

export default function ResumeProfileSection({ status }: ResumeProfileSectionProps) {
  const { register, watch, setValue, getValues } = useFormContext<ResumeDetailForm>();
  console.log('getValues: ', getValues('name'));

  const nameValue = getValues('name');
  const localCodeValue = getValues('localCode');
  const sexCodeValue = getValues('sexCode');
  const birthdayValue = getValues('birthday');
  const phoneValue = getValues('phone');

  const setDaumPostState = useSetRecoilState(daumPostAtom);

  return (
    <S.ResumeProfileSection>
      <div className="profile-box">
        <div className="profile-form">
          <FormInput<ResumeDetailForm> name="name" maxWidth="300px" readOnly={false} errorPosition="static" placeholder="이름" />
          <div style={{ display: 'flex' }}>
            <FormInput<ResumeDetailForm>
              name="sexCode"
              maxWidth="80px"
              readOnly={false}
              label="성별"
              margin="0 15px 0 0"
              errorPosition="static"
            />
            <FormInput<ResumeDetailForm>
              name="birthday"
              maxWidth="205px"
              readOnly={false}
              label="생년월일"
              placeholder="생년월일"
              errorPosition="static"
            />
          </div>
          <FormInput<ResumeDetailForm>
            label="휴대폰"
            name="phone"
            maxWidth="300px"
            readOnly={false}
            mask="999-9999-9999"
            errorPosition="static"
          />

          <FormInput<ResumeDetailForm> name="address" disabled margin="0 0 0 0" maxWidth="300px" label="주소" errorPosition="static" />
          <FormInput<ResumeDetailForm> name="addressDetail" label="상세주소" maxWidth="300px" errorPosition="static" />

          <FormInput<ResumeDetailForm> name="email" label="이메일" maxWidth="300px" />
        </div>
        <ResumeProfileImage<ResumeDetailForm> name="profileImage" />
      </div>

      {/* <Button variant="secondary100" label="주소 검색" width="90px" height="40px" onClick={() => setDaumPostState({ isOpen: true })} /> */}
    </S.ResumeProfileSection>
  );
}

const S = {
  ResumeProfileSection: styled.div`
    .profile-box {
      display: flex;
      /* border: 1px solid red; */
      .profile-form {
        flex: 1;
        /* border: 1px solid red; */
      }
    }
    .address-box {
      display: flex;
      ${(props) => props.theme.media.mobile`
        flex-direction: column;
      `};
    }
  `,
};
