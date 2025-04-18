import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { alertWithConfirmSelector, alertWithConfirmAtom } from '@/recoil/alertWithConfirm';

export default function Alert() {
  const alertWithConfirmSelectorValue = useRecoilValue(alertWithConfirmSelector);
  const resetAlertWithConfirmAtom = useResetRecoilState(alertWithConfirmAtom);

  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        alertWithConfirmSelectorValue.onClickConfirm();
        resetAlertWithConfirmAtom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [alertWithConfirmSelectorValue, resetAlertWithConfirmAtom]);

  return (
    <Portal>
      <Background>
        <S.Alert>
          <S.Content>
            <h3 className="title">{alertWithConfirmSelectorValue.title}</h3>
            <p className="description">{alertWithConfirmSelectorValue.subTitle}</p>
          </S.Content>

          <S.ButtonBox>
            <Button
              name="positive"
              label={alertWithConfirmSelectorValue.confirmLabel}
              variant="primary100"
              maxWidth="100px"
              type="button"
              height="45px"
              onClick={() => {
                alertWithConfirmSelectorValue.onClickConfirm();
                resetAlertWithConfirmAtom();
              }}
            />
          </S.ButtonBox>
        </S.Alert>
      </Background>
    </Portal>
  );
}

const S = {
  Alert: styled.article`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    opacity: 0.99;
    aspect-ratio: 16/9;
    margin: 0 auto;
    width: 400px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    will-change: transform;
    padding: 35px 25px 25px 25px;
    z-index: 16;
    ${(props) => props.theme.media.mobile`
      width: 90%;
    `};
  `,
  Content: styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    .title {
      color: ${(props) => props.theme.colors.black100};
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      white-space: pre-line;
      line-height: 1.2;
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
      `};
    }
    .description {
      color: ${(props) => props.theme.colors.black600};
      font-weight: 400;
      margin-top: 20px;
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      white-space: pre-line;
      ${(props) => props.theme.media.mobile`
        margin-top: 15px;
        font-size: 15px;
      `};
    }
  `,
  ButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
};
