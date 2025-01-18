import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import UserTitle from '@/components/common/user/UserTitle';
import ProfileTitle from '@/components/userProfile/ProfileTitle';
import { ApplicantProfile } from '@/types';
import Button from '@/components/common/style/Button';
interface UserProfileProps {
  isLoading: boolean;
  isSuccess: boolean;
  data: ApplicantProfile | undefined;
}

export default function UserProfile({ isLoading, isSuccess, data }: UserProfileProps) {
  return (
    <S.UserProfile>
      <UserAsideMenu />
      {isLoading && <div>로딩중...</div>}
      {isSuccess && data && (
        <div className="profile-container">
          <UserTitle title="회원정보" />

          <ProfileTitle title="계정 정보" />
          <S.Panel>
            <S.ItemTitle>소셜 계정</S.ItemTitle>
            <S.Item>{data.provider}</S.Item>

            <S.ItemTitle>이메일</S.ItemTitle>
            <S.Item>{data.email}</S.Item>

            <S.ItemTitle>가입일</S.ItemTitle>
            <S.Item>{data.createdAt}</S.Item>
          </S.Panel>

          <ProfileTitle title="개인 정보" />
          <S.Panel>
            <S.ItemTitle>닉네임</S.ItemTitle>
            <S.Item>
              <p>{data.nickname}</p>
              <Button label="변경" variant="tertiary" height="30px" width="80px" fontSize="14px" />
            </S.Item>

            <S.ItemTitle>본인인증</S.ItemTitle>
            <S.Item>미인증</S.Item>
          </S.Panel>

          <ProfileTitle title="광고성 정보 수신" />
          <S.Panel>
            <S.Item>이메일 {data.consent.emailMarketingAgree}</S.Item>
            <S.Item>SMS {data.consent.smsMarketingAgree}</S.Item>
          </S.Panel>

          <S.WithdrawalButton>회원탈퇴</S.WithdrawalButton>
        </div>
      )}
    </S.UserProfile>
  );
}

const S = {
  UserProfile: styled.section`
    display: flex;
    .profile-container {
      flex: 1;
      max-width: 450px;
    }
  `,
  Panel: styled.article`
    margin-bottom: 50px;
  `,
  ItemTitle: styled.h6`
    color: ${(props) => props.theme.colors.black900};
    font-size: 14px;
  `,
  Item: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    color: ${(props) => props.theme.colors.black600};
    height: 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
  `,
  WithdrawalButton: styled.button`
    font-size: 13px;
    text-decoration: underline;
    font-weight: 300;
    color: ${(props) => props.theme.colors.gray400};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.black900};
    }
  `,
};
