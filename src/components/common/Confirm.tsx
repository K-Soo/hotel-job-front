import styled from 'styled-components';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';
import Button from '@/components/common/style/Button';
import Icon from '@/icons/Icon';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { alertWithConfirmSelector, alertWithConfirmAtom } from '@/recoil/alertWithConfirm';

interface ConfirmProps {}

export default function Confirm({}: ConfirmProps) {
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
          {alertWithConfirmSelectorValue.image && (
            <div className="image-box">
              <Image src="/images/auth.png" fill alt="image" />
            </div>
          )}

          <S.ButtonBox>
            <Button
              name="positive"
              label={alertWithConfirmSelectorValue.cancelLabel}
              variant="secondary"
              maxWidth="200px"
              margin="0 15px 0 0"
              onClick={() => {
                alertWithConfirmSelectorValue.onClickCancel();
                resetAlertWithConfirmAtom();
              }}
            />
            <Button
              name="positive"
              label={alertWithConfirmSelectorValue.confirmLabel}
              variant="primary"
              maxWidth="200px"
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
    width: 450px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
    border-radius: 10px;
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
      color: ${(props) => props.theme.colors.black400};
      font-size: 22px;
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
      font-size: 16px;
      text-align: left;
      line-height: 1.1;
      ${(props) => props.theme.media.mobile`
        font-size: 14px;
        margin-top: 15px;
      `};
    }
  `,
  ButtonBox: styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
  `,
};
