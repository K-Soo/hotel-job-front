import styled from 'styled-components';
import ResumeUploadProfileImageForm from '@/components/common/resume/ResumeUploadProfileImageForm';
import FormInput from '@/components/common/form/FormInput';
import Button from '@/components/common/style/Button';
import { ResumeDetailForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';
import ResumeTitleForm from '@/components/userResumeDetail/ResumeTitleForm';
import FormChipsRadio from '@/components/common/form/FormChipsRadio';
// import FormMapSelect from '@/components/common/form/FormMapSelect';
// import { LOCAL_CODE, SEX_CODE } from '@/constants';
// import { CAREER_LEVEL } from '@/constants/resume';
// import ResumeFormTitle from '@/components/common/resume/ResumeFormTitle';
// import Profile from './resumePreview/Profile';

export default function ResumeProfileSection() {
  const setDaumPostState = useSetRecoilState(daumPostAtom);

  return (
    <S.ResumeProfileSection>
      <ResumeTitleForm name="title" />

      <S.ProfileInfo>
        <ResumeUploadProfileImageForm<ResumeDetailForm> name="profileImage" />

        <div className="detail">
          <div className="mb-[20px]">
            <FormChipsRadio value={'NEWBIE'} name="careerLevel" label={'신입'} margin="0 15px 0 0" palette="blue" />
            <FormChipsRadio value={'EXPERIENCED'} name="careerLevel" label={'경력'} margin="0 15px 0 0" palette="blue" />
          </div>

          <div className="flex flex-col md:flex-row">
            <FormInput<ResumeDetailForm> name="name" placeholder="이름" label="이름" required margin="0 15px 0 0" />
            <FormInput<ResumeDetailForm> name="email" label="이메일" maxLength={30} required placeholder="이메일" />
          </div>

          {/* 
          <S.CertBox>
            <FormMapSelect<ResumeDetailForm>
              name="localCode"
              options={LOCAL_CODE}
              required
              maxWidth="90px"
              disabled
              label="내국인"
              margin="0 15px 0 0"
            />

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
          </S.CertBox> */}

          <div className="flex">
            <FormInput<ResumeDetailForm> label="연락처" name="phone" mask="999-9999-9999" errorPosition="static" disabled />
          </div>

          <div className="flex items-center">
            <FormInput<ResumeDetailForm> label="주소" name="address" placeholder="주소" disabled required />
            <Button
              variant="primary"
              label="검색"
              width="90px"
              height="40px"
              onClick={() => setDaumPostState({ isOpen: true })}
              margin="0 0 0 15px"
            />
          </div>
          <FormInput<ResumeDetailForm> name="addressDetail" placeholder="상세주소" />
        </div>
      </S.ProfileInfo>
    </S.ResumeProfileSection>
  );
}

const S = {
  ResumeProfileSection: styled.div``,
  ProfileInfo: styled.div`
    display: flex;
    width: 100%;
    .detail {
      flex: 1;
      margin-left: 50px;
      width: 100%;
    }
    ${(props) => props.theme.media.mobile`
      flex-direction: column;
      align-items: center;
      .detail {
        flex: 1;
        margin-top: 30px;
        margin-left: 0;
      }
    `};
  `,
};
