import React from 'react';
import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
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
          {alertWithConfirmSelectorValue.image && (
            <div className="image-box">
              <Image src="/images/auth.png" fill alt="image" />
            </div>
          )}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              name="positive"
              label={alertWithConfirmSelectorValue.confirmLabel}
              variant="primary"
              maxWidth="120px"
              type="button"
              onClick={() => {
                alertWithConfirmSelectorValue.onClickConfirm();
                resetAlertWithConfirmAtom();
              }}
            />
          </div>
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
    width: 480px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    will-change: transform;
    padding: 30px;
    .image-box {
      position: relative;
      display: flex;
      justify-content: center;
      font-size: 0;
      margin-top: 15px;
      width: 128px;
      height: 128px;
    }
    ${(props) => props.theme.media.laptop`
    `};
    ${(props) => props.theme.media.tablet`
      width: 480px;
    `};
    ${(props) => props.theme.media.mobile`
     width: 95%;
    `};
  `,
  Content: styled.div`
    position: relative;
    flex: 1;
    .title {
      margin-top: 10px;
      color: ${(props) => props.theme.colors.black400};
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      ${(props) => props.theme.media.tablet`
        font-size: 24px;
      `};
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
      `};
    }
    .description {
      color: ${(props) => props.theme.colors.black500};
      font-weight: 400;
      margin-top: 30px;
      font-size: 18px;
      text-align: left;
      line-height: 1.1;
      ${(props) => props.theme.media.mobile`
        font-size: 14px;
        margin-top: 15px;
      `};
    }
  `,
};
