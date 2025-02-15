import styled from 'styled-components';

interface NicknameFormProps {
  nickname: string;
}

export default function NicknameForm({ nickname }: NicknameFormProps) {
  return (
    <S.NicknameForm>
      <div className="content">
        <p className="content__title">현재 닉네임</p>
        <p className="content__value">{nickname}</p>
      </div>

      <div className="content">
        <p className="content__title">변경</p>
        <input type="text" />
      </div>
    </S.NicknameForm>
  );
}

const S = {
  NicknameForm: styled.div`
    .content {
      display: flex;
      align-items: center;
      height: 45px;
      &__title {
        flex-basis: 90px;
      }
    }
  `,
};
