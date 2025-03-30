import styled from 'styled-components';
import SectionTitle from '@/components/common/employer/SectionTitle';
import CheckBox from '@/components/common/style/CheckBox';
import { ConsentFormType } from '@/containers/employerAccountWithdrawContainer';

interface EmployerAccountWithdrawProps {
  consentForm: ConsentFormType;
  handleChangeConsent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export default function EmployerAccountWithdraw({ consentForm, handleChangeConsent, children }: EmployerAccountWithdrawProps) {
  return (
    <S.EmployerAccountWithdraw>
      <div className="withdraw-container">
        <SectionTitle title="회원탈퇴" textAlignment="center" margin="0 0 60px 0" />
        <div className="withdraw-content">
          <S.GuideContent>
            <p className="important">탈퇴 전, 아래 내용을 반드시 확인해주세요.</p>

            <div className="guide-item">
              <p className="guide-item__title">1. 회원 탈퇴 후 복구가 불가능합니다.</p>
              <p className="guide-item__text">탈퇴 요청 시 모든 계정 정보와 데이터가 영구 삭제되며, 복구할 수 없습니다.</p>
            </div>

            <div className="guide-item">
              <p className="guide-item__title">2. 등록한 채용공고 및 지원자 정보가 삭제됩니다.</p>
              <p className="guide-item__text">탈퇴 후에는 작성하신 채용공고 및 지원자 정보가 모두 삭제되며, 더 이상 접근할 수 없습니다.</p>
            </div>

            <div className="guide-item">
              <p className="guide-item__title">3. 보유 중인 포인트, 멤버십, 쿠폰이 소멸됩니다.</p>
              <p className="guide-item__text">탈퇴 시 보유 중이던 포인트, 멤버십 혜택, 쿠폰은 즉시 소멸되며 복구되지 않습니다.</p>
            </div>

            <div className="guide-item">
              <p className="guide-item__title">4. 탈퇴 후 동일한 정보로 재가입이 제한될 수 있습니다.</p>
              <p className="guide-item__text">기존 계정과 동일한 계정정보 또는 본인인증 정보로 재가입이 어려울 수 있습니다.</p>
            </div>

            <div className="guide-item">
              <p className="guide-item__title">5. 회원 탈퇴 후에도 일부 법적 의무에 따라 데이터가 일정 기간 보관될 수 있습니다.</p>
              <p className="guide-item__text">관련 법률에 따라 보관이 필요한 정보는 일정 기간 동안 유지될 수 있습니다.</p>
            </div>
          </S.GuideContent>

          <S.ConsentBox>
            <CheckBox
              required
              name="rejoinRestriction"
              onChange={handleChangeConsent}
              checked={consentForm.rejoinRestriction}
              fontSize="14px"
              label="회원 탈퇴 후 동일한 본인인증 정보로 재가입이 제한될 수 있음을 이해했습니다."
              margin="10px 0"
            />

            <CheckBox
              required
              name="dataDeletion"
              onChange={handleChangeConsent}
              checked={consentForm.dataDeletion}
              fontSize="14px"
              label="회원 탈퇴 시 모든 계정 정보가 삭제됨을 이해하며 이에 동의합니다."
              margin="10px 0"
            />

            <CheckBox
              required
              name="accountRecovery"
              onChange={handleChangeConsent}
              checked={consentForm.accountRecovery}
              fontSize="14px"
              label="회원 탈퇴 요청 후 계정 복구가 불가능함을 확인하였으며 이에 동의합니다."
              margin="10px 0"
            />
          </S.ConsentBox>
          <S.ButtonBox>{children}</S.ButtonBox>
        </div>
      </div>
    </S.EmployerAccountWithdraw>
  );
}

const S = {
  EmployerAccountWithdraw: styled.section`
    .withdraw-container {
      margin: 0 auto;
      max-width: 650px;
    }
  `,
  GuideContent: styled.div`
    background-color: ${(props) => props.theme.colors.gray};
    border-radius: 10px;
    padding: 30px 20px;
    margin: 30px 0;
    .important {
      font-weight: 500;
      text-align: center;
      font-size: 20px;
      margin-bottom: 30px;
    }
    .guide-item {
      padding: 20px 0;
      &__title {
        font-weight: 500;
        padding-bottom: 5px;
        color: ${(props) => props.theme.colors.black400};
      }
      &__text {
        text-indent: 20px;
        color: ${(props) => props.theme.colors.black600};
      }
    }
  `,
  ConsentBox: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
  `,
  ButtonBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  `,
};
