import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';

interface ApplicantNoticeFormProps {}

export default function ApplicantNoticeForm({}: ApplicantNoticeFormProps) {
  return (
    <Portal>
      <Background>
        <S.ApplicantNoticeForm>ApplicantNoticeForm</S.ApplicantNoticeForm>
      </Background>
    </Portal>
  );
}

const S = {
  ApplicantNoticeForm: styled.div`
    z-index: 15;
    position: fixed;
    top: 0;
    right: 0;
    width: 330px;
    height: 100vh;
    background-color: white;
  `,
};
