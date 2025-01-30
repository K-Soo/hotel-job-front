import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';

interface ApplicantNoticeFormProps {}

export default function ApplicantNoticeForm({}: ApplicantNoticeFormProps) {
  return (
    <Portal>
      <Background>
        <S.ApplicantNoticeForm>
          <S.Header>xx</S.Header>
          <S.Content>
            <div>대상자</div>
            <div>전형</div>
            <div>발표 문구</div>
          </S.Content>
          <S.Bottom>
            <Button label="취소" variant="secondary" />
            <Button label="알림 보내기" variant="primary" margin="0 0 0 15px" />
          </S.Bottom>
        </S.ApplicantNoticeForm>
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
    width: 450px;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 15px;
  `,
  Content: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 15px;
  `,
  Bottom: styled.div`
    border-top: 1px solid ${({ theme }) => theme.colors.gray300};
    height: 70px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};
