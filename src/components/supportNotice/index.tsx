import styled from 'styled-components';
import SupportAsideMenu from '@/components/common/support/SupportAsideMenu';

interface SupportNoticeProps {}

export default function SupportNotice({}: SupportNoticeProps) {
  return (
    <S.SupportNotice>
      <SupportAsideMenu />
    </S.SupportNotice>
  );
}

const S = {
  SupportNotice: styled.div``,
};
