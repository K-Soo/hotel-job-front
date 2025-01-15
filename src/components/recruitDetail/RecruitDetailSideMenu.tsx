import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import Dimmed from '@/components/common/Dimmed';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';
interface RecruitDetailSideMenuProps {
  managerName: string;
  managerNumber: string;
}

export default function RecruitDetailSideMenu({ managerName, managerNumber }: RecruitDetailSideMenuProps) {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  // TODO  - 지원하기 클릭 시
  const handleClickApply = () => {
    if (!isAuthenticated) {
      addToast({ message: '로그인 후 이용해주세요.', type: 'info' });
    }
  };

  return (
    <S.RecruitDetailSideMenu>
      <Button label="지원하기" variant="primary" height="50px" borderRadius="10px" onClick={handleClickApply} />
      <div className="info-box">
        {!isAuthenticated && (
          <Dimmed>
            <Button
              label="로그인/회원가입"
              variant="secondary200"
              height="40px"
              width="140px"
              onClick={() => router.push(path.SIGN_IN)}
              fontSize="14px"
            />
          </Dimmed>
        )}
        <div className="info-box__item">
          <span>담당자</span>
          <em>{managerName}</em>
        </div>
        <div className="info-box__item">
          <span>연락처</span>
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
    height: 400px;
    margin-left: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
    .info-box {
      position: relative;
      margin-top: 30px;
      background-color: ${(props) => props.theme.colors.gray};
      border-radius: 10px;
      padding: 20px;
      &__item {
        margin-bottom: 15px;
        font-size: 15px;
        display: flex;
        color: ${(props) => props.theme.colors.black200};
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
