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
          <Button
            name="positive"
            label={alertWithConfirmSelectorValue.confirmLabel}
            variant="secondary100"
            maxWidth="200px"
            margin="15px 0 0 0"
            onClick={() => {
              alertWithConfirmSelectorValue.onClickConfirm();
              resetAlertWithConfirmAtom();
            }}
          />
        </S.Alert>
      </Background>
    </Portal>
  );
}

const StyledIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

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
    width: 550px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    will-change: transform;
    padding: 30px 15px;
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
      width: 90%;
    `};
  `,
  Content: styled.div`
    position: relative;
    flex: 1;
    .title {
      margin-top: 10px;
      color: ${(props) => props.theme.colors.black100};
      font-size: 26px;
      font-weight: 500;
      text-align: center;
      ${(props) => props.theme.media.tablet`
        font-size: 24px;
      `};
      ${(props) => props.theme.media.mobile`
        font-size: 18px;
      `};
    }
    .description {
      color: ${(props) => props.theme.colors.black400};
      font-weight: 400;
      margin-top: 30px;
      font-size: 18px;
      text-align: center;
      line-height: 1.1;
      padding: 0 20px;
      ${(props) => props.theme.media.mobile`
        font-size: 14px;
        margin-top: 15px;
      `};
    }
  `,
};
