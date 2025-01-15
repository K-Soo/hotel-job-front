import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { alertWithConfirmSelector, alertWithConfirmAtom } from '@/recoil/alertWithConfirm';

export default function Confirm() {
  const alertWithConfirmSelectorValue = useRecoilValue(alertWithConfirmSelector);
  const resetAlertWithConfirmAtom = useResetRecoilState(alertWithConfirmAtom);

  return (
    <Portal>
      <Background>
        <S.Confirm>
          <S.Content>
            <h3 className="title">{alertWithConfirmSelectorValue.title}</h3>
            <p className="description">{alertWithConfirmSelectorValue.subTitle}</p>
          </S.Content>

          <S.ButtonBox>
            <Button
              name="positive"
              className="cancel-button"
              label={alertWithConfirmSelectorValue.cancelLabel}
              variant="cancel"
              maxWidth="200px"
              margin="0 15px 0 0"
              height="45px"
              onClick={() => {
                alertWithConfirmSelectorValue.onClickCancel();
                resetAlertWithConfirmAtom();
              }}
            />
            <Button
              name="positive"
              className="primary-button"
              label={alertWithConfirmSelectorValue.confirmLabel}
              variant="primary"
              maxWidth="200px"
              height="45px"
              onClick={() => {
                alertWithConfirmSelectorValue.onClickConfirm();
                resetAlertWithConfirmAtom();
              }}
            />
          </S.ButtonBox>
        </S.Confirm>
      </Background>
    </Portal>
  );
}

const S = {
  Confirm: styled.article`
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
    ${(props) => props.theme.media.mobile`
      width: 90%;
      padding: 35px 25px 15px 25px;
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
      ${(props) => props.theme.media.mobile`
        font-size: 20px;
      `};
    }
    .description {
      color: ${(props) => props.theme.colors.black500};
      font-weight: 300;
      margin-top: 15px;
      font-size: 16px;
      text-align: center;
      line-height: 1.3;
      ${(props) => props.theme.media.mobile`
        margin-top: 15px;
        font-size: 15px;
      `};
    }
  `,
  ButtonBox: styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    ${(props) => props.theme.media.mobile`
      margin-top: 30px;
      flex-direction: column-reverse;
      .cancel-button {
        max-width: 100%;
        margin: 10px 0 0 0;
      }
      .primary-button {
        max-width: 100%;
      }
    `};
  `,
};
