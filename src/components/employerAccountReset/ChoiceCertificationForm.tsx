import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { certificationModalAtom } from '@/recoil/certification';

interface ChoiceCertificationFormProps {
  handleOpenResetPasswordModal: () => void;
}

export default function ChoiceCertificationForm({ handleOpenResetPasswordModal }: ChoiceCertificationFormProps) {
  const setCertificationModalAtom = useSetRecoilState(certificationModalAtom);

  return (
    <S.ChoiceCertificationForm>
      <S.Description>
        비밀번호 재설정을 위해
        <br />
        사용자 확인을 진행합니다.
      </S.Description>

      <S.CertificationItem
        initial={{ background: 'white' }}
        whileHover={{ background: '#f9f9f9' }}
        whileTap={{ scale: 0.99 }}
        onClick={() => handleOpenResetPasswordModal()}
      >
        <div className="content">
          <p className="content__category">휴대폰으로 본인인증</p>
          <p className="content__text">계정에 등록된 휴대폰 본인확인정보로 인증합니다.</p>
        </div>
        <Icon name="ArrowRight16x16" width="16px" height="16px" />
      </S.CertificationItem>
    </S.ChoiceCertificationForm>
  );
}

const S = {
  ChoiceCertificationForm: styled.div``,
  Description: styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.black500};
    margin-bottom: 30px;
  `,
  CertificationItem: styled(motion.div)`
    display: flex;
    justify-content: space-around;
    height: 100px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 0 10px;
    .content {
      flex: 1;
      &__category {
        font-size: 16px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black400};
        margin-bottom: 10px;
      }
      &__text {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black800};
      }
    }
  `,
};
