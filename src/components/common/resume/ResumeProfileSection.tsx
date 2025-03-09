import styled from 'styled-components';
import ResumeUploadProfileImageForm from '@/components/common/resume/ResumeUploadProfileImageForm';
import FormInput from '@/components/common/form/FormInput';
import FormMapSelect from '@/components/common/form/FormMapSelect';
import Button from '@/components/common/style/Button';
import { ResumeDetailForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';
import { LOCAL_CODE, SEX_CODE } from '@/constants';
import { CAREER_LEVEL } from '@/constants/resume';

export default function ResumeProfileSection() {
  const setDaumPostState = useSetRecoilState(daumPostAtom);

  return (
    <S.ResumeProfileSection>
      <article className="profile-form">
        <div className="profile-form__inner">
          <S.NameBox>
            <FormInput<ResumeDetailForm>
              name="name"
              maxWidth="150px"
              readOnly={false}
              errorPosition="absolute"
              placeholder="이름"
              label="이름"
              margin="0 15px 0 0"
            />
            <FormMapSelect<ResumeDetailForm>
              name="careerLevel"
              required
              maxWidth="130px"
              label="경력여부"
              options={{ '': '선택', ...CAREER_LEVEL }}
            />
          </S.NameBox>

          <S.CertBox>
            {/* <FormMapSelect<ResumeDetailForm>
              name="localCode"
              options={LOCAL_CODE}
              required
              maxWidth="90px"
              disabled
              label="내국인"
              margin="0 15px 0 0"
            /> */}

            <FormMapSelect<ResumeDetailForm>
              name="sexCode"
              options={SEX_CODE}
              required
              maxWidth="65px"
              disabled
              label="성별"
              margin="0 15px 0 0"
            />

            <FormInput<ResumeDetailForm>
              name="birthday"
              maxWidth="110px"
              readOnly={false}
              label="생년월일"
              placeholder="생년월일"
              errorPosition="absolute"
              disabled
              mask={'9999-99-99'}
            />
          </S.CertBox>

          <FormInput<ResumeDetailForm>
            label="휴대폰"
            name="phone"
            maxWidth="190px"
            readOnly={false}
            mask="999-9999-9999"
            errorPosition="static"
            disabled
          />

          <FormInput<ResumeDetailForm> name="email" label="이메일" maxWidth="295px" maxLength={30} />
        </div>

        <ResumeUploadProfileImageForm<ResumeDetailForm> name="profileImage" />
      </article>

      <S.AddressBox>
        <div className="address">
          <FormInput<ResumeDetailForm> label="주소" name="address" maxWidth="350px" errorPosition="static" placeholder="주소" disabled />
          <Button
            variant="primary"
            label="검색"
            width="90px"
            height="40px"
            onClick={() => setDaumPostState({ isOpen: true })}
            margin="0 0 0 15px"
          />
        </div>
        <FormInput<ResumeDetailForm> name="addressDetail" maxWidth="350px" errorPosition="absolute" placeholder="상세주소" />
      </S.AddressBox>
    </S.ResumeProfileSection>
  );
}

const S = {
  ResumeProfileSection: styled.div`
    .profile-form {
      display: flex;
      ${(props) => props.theme.media.mobile`
        flex-direction: column-reverse;
      `};
      &__inner {
        flex: 1;
      }
    }
  `,
  NameBox: styled.div`
    display: flex;
    margin-bottom: 15px;
  `,
  AddressBox: styled.div`
    margin-top: 15px;
    .address {
      display: flex;
      align-items: center;
    }
  `,
  CertBox: styled.div`
    display: flex;
    margin-bottom: 15px;
  `,
};
