import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { EmployerAccountInfo } from '@/types';
import { certificationModalAtom } from '@/recoil/certification';
import { useSetRecoilState } from 'recoil';
import { dateFormat, priceComma } from '@/utils';
import { ACCOUNT_STATUS } from '@/constants/account';
interface EmployerAccountProps {
  data?: EmployerAccountInfo | undefined;
  setIsOpenNicknameModal?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function EmployerAccount({ data, setIsOpenNicknameModal, children }: EmployerAccountProps) {
  const setCertificationModalAtomState = useSetRecoilState(certificationModalAtom);

  return (
    <S.EmployerAccount>
      {children}
      {data && (
        <S.ContentContainer>
          <S.ContentTitle>기본 정보</S.ContentTitle>
          <S.ContentForm>
            <S.Content>
              <p className="title">닉네임</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.nickname}</p>
                <Button
                  label="변경"
                  variant="secondary100"
                  width="80px"
                  height="30px"
                  margin="0 0 0 15px"
                  fontSize="14px"
                  onClick={() => {
                    if (setIsOpenNicknameModal) {
                      setIsOpenNicknameModal(true);
                    }
                  }}
                />
              </div>
            </S.Content>

            <S.Content>
              <p className="title">계정상태</p>
              <div className="wrapper">
                <p className="wrapper__text">{ACCOUNT_STATUS[data.accountStatus]}</p>
              </div>
            </S.Content>

            <S.Content>
              <p className="title">보유 포인트</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.totalPoint}P</p>
              </div>
            </S.Content>

            <S.Content>
              <p className="title">본인인증</p>
              <div className="wrapper">
                <p className="wrapper__text">{data.certificationStatus === 'VERIFIED' ? '인증완료' : '미인증'}</p>
                {data.certificationStatus !== 'VERIFIED' && (
                  <Button
                    label="인증하기"
                    variant="tertiary"
                    width="80px"
                    height="35px"
                    margin="0 0 0 30px"
                    fontSize="14px"
                    onClick={() => setCertificationModalAtomState({ isOpen: true })}
                  />
                )}
              </div>
            </S.Content>

            <S.Content>
              <p className="title">가입일</p>
              <div className="wrapper">
                <p className="wrapper__text">{dateFormat.date(data.createdAt, 'YYYY.MM.DD')}</p>
              </div>
            </S.Content>
          </S.ContentForm>

          <S.ContentTitle>혜택 정보</S.ContentTitle>
          <S.ContentForm>
            <S.Content>
              <p className="title">멤버십 등급</p>
              <div className="wrapper">
                <p className="wrapper__text">
                  <span>{data.membership.membershipLevel}</span>
                </p>
              </div>
            </S.Content>

            <S.Content>
              <p className="title">멤버십 점수</p>
              <div className="wrapper">
                <p className="wrapper__text">{priceComma(data.totalScore)}점</p>
              </div>
            </S.Content>

            <S.Content>
              <p className="title">보유 쿠폰</p>
              <div className="wrapper">
                <p className="wrapper__text">
                  <span>{data.availableCouponCount ?? 0}개</span>
                </p>
              </div>
            </S.Content>
          </S.ContentForm>
        </S.ContentContainer>
      )}
    </S.EmployerAccount>
  );
}

const S = {
  EmployerAccount: styled.section``,
  ContentContainer: styled.div`
    max-width: 768px;
  `,
  ContentTitle: styled.h6`
    font-size: 18px;
    margin-bottom: 10px;
  `,
  ContentForm: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray600};
    margin-bottom: 50px;
  `,
  Content: styled.div`
    display: flex;
    align-items: center;
    height: 55px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: 0 20px;
    font-size: 14px;
    .title {
      flex-basis: 130px;
      color: ${({ theme }) => theme.colors.black600};
    }
    .wrapper {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.black400};
      &__text {
        width: 200px;
      }
    }
  `,
  PhoneCertTag: styled.span<{ $active: boolean }>`
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
