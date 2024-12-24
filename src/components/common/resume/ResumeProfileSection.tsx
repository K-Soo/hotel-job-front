import styled from 'styled-components';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';
import FormInput from '@/components/common/form/FormInput';
import Line from '@/components/common/Line';
import Button from '@/components/common/style/Button';
import { ResumeRegisterForm } from '@/types';
import { useSetRecoilState } from 'recoil';
import { daumPostAtom } from '@/recoil/daumPost';

interface ResumeProfileSectionProps {}

export default function ResumeProfileSection({}: ResumeProfileSectionProps) {
  const setDaumPostState = useSetRecoilState(daumPostAtom);

  return (
    <S.ResumeProfileSection>
      <div className="profile-box">
        <ResumeProfileImage<ResumeRegisterForm> name="title" />
        <div className="profile-form">
          <FormInput<ResumeRegisterForm> name="title" maxWidth="240px" label="이름" />
          <FormInput<ResumeRegisterForm> name="title" maxWidth="240px" label="성별" />
          <FormInput<ResumeRegisterForm> name="title" maxWidth="240px" label="전화번호" />
        </div>
      </div>
      <Line />
      <FormInput name="name" label="이메일" />

      <div className="zip-box">
        <FormInput<ResumeRegisterForm> name="title" label="우편번호" maxWidth="135px" disabled />
        <Button
          variant="secondary100"
          label="주소 검색"
          width="90px"
          height="40px"
          margin="5px 0 0 15px"
          onClick={() => setDaumPostState({ isOpen: true })}
        />
      </div>

      <div className="address-box">
        <FormInput<ResumeRegisterForm> name="title" label="주소" margin="0 15px 15px 0" maxWidth="240px" disabled />
        <FormInput<ResumeRegisterForm> name="title" label="상세주소" margin="0 0 15px 0" />
      </div>
    </S.ResumeProfileSection>
  );
}

const S = {
  ResumeProfileSection: styled.div`
    .profile-box {
      display: flex;
      .profile-form {
        flex: 1;
      }
    }
    .zip-box {
      display: flex;
      align-items: center;
    }
    .address-box {
      display: flex;
      ${(props) => props.theme.media.mobile`
        flex-direction: column;
      `};
    }
  `,
};
