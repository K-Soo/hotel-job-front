import styled from 'styled-components';
import Button from '@/components/common/style/Button';

interface RecruitDetailSideMenuProps {
  managerName: string;
  managerEmail: string;
  managerNumber: string;
}

export default function RecruitDetailSideMenu({ managerEmail, managerName, managerNumber }: RecruitDetailSideMenuProps) {
  return (
    <S.RecruitDetailSideMenu>
      <Button label="지원하기" variant="primary" />
      <div className="info-box">
        <div className="info-box__item">
          <span>담당자</span>
          <em>{managerName}</em>
        </div>
        <div className="info-box__item">
          <span>담당자 이메일</span>
          <em>{managerEmail}</em>
        </div>
        <div className="info-box__item">
          <span>담당자 연락처</span>
          <em>{managerNumber}</em>
        </div>
      </div>
      <div className="period-box"></div>
    </S.RecruitDetailSideMenu>
  );
}

const S = {
  RecruitDetailSideMenu: styled.div`
    flex: 0 0 330px;
    position: sticky;
    top: 90px;
    z-index: 200;
    height: 400px;
    margin-left: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    .info-box {
      margin-top: 30px;
      background-color: ${(props) => props.theme.colors.gray100};
      border-radius: 5px;
      padding: 20px;
      &__item {
        margin-bottom: 10px;
        font-size: 15px;
        display: flex;
        color: ${(props) => props.theme.colors.gray700};
        span {
          flex: 0 0 100px;
          display: inline-block;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `,
};
