import styled from 'styled-components';
import UserAsideMenu from '@/components/common/user/UserAsideMenu';
import UserTitle from '@/components/common/user/UserTitle';
import ProfileTitle from '@/components/userProfile/ProfileTitle';
import { ApplicantProfile } from '@/types';
import Button from '@/components/common/style/Button';
import { dateFormat } from '@/utils';
interface UserProfileProps {
  isLoading: boolean;
  isSuccess: boolean;
  data: ApplicantProfile | undefined;
  handleClickWithdrawal: () => void;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserProfile({ isLoading, isSuccess, data, handleClickWithdrawal, setIsOpenModal }: UserProfileProps) {
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
            <S.Item>{dateFormat.date(data.createdAt, 'YYYY.MM.DD')}</S.Item>
          </S.Panel>

          <ProfileTitle title="개인 정보" />

          <S.Panel>
            <S.ItemTitle>닉네임</S.ItemTitle>
            <S.Item>
              <p>{data.nickname}</p>
              <Button label="변경" variant="secondary100" height="30px" width="80px" fontSize="14px" onClick={() => setIsOpenModal(true)} />
            </S.Item>
            <S.ItemTitle>본인인증</S.ItemTitle>
            {data.certificationStatus === 'VERIFIED' && <S.Item>인증</S.Item>}
            {data.certificationStatus !== 'VERIFIED' && (
              <S.Item>
                <StyledCertTag>미인증</StyledCertTag>
                <Button label="인증하기" variant="tertiary" height="30px" width="80px" fontSize="14px" />
              </S.Item>
            )}
          </S.Panel>

          <ProfileTitle title="광고성 정보 수신" />

          <S.Panel>
            <S.Item>이메일 {data.consent.emailMarketingAgree}</S.Item>
            <S.Item>SMS {data.consent.smsMarketingAgree}</S.Item>
          </S.Panel>

          <S.WithdrawalButton onClick={handleClickWithdrawal}>회원탈퇴</S.WithdrawalButton>
        </div>
      )}
    </S.UserProfile>
  );
}

const StyledCertTag = styled.span`
  border: 1px solid red;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 15px;
`;

const S = {
  UserProfile: styled.section`
    display: flex;
    .profile-container {
      flex: 1;
      max-width: 450px;
    }
  `,
  Panel: styled.article`
    margin-bottom: 60px;
  `,
  ItemTitle: styled.h6`
    color: ${(props) => props.theme.colors.black900};
    font-size: 14px;
  `,
  Item: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.black600};
    height: 45px;
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
