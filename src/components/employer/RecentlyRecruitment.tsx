import styled from 'styled-components';

interface RecentlyRecruitmentProps {}

export default function RecentlyRecruitment({}: RecentlyRecruitmentProps) {
  return (
    <S.RecentlyRecruitment>
      <h3 className="title">최근 등록된 공고</h3>
      <S.Content>asd</S.Content>
    </S.RecentlyRecruitment>
  );
}

const S = {
  RecentlyRecruitment: styled.div`
    .title {
      font-size: 22px;
      margin-bottom: 15px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.black400};
    }
  `,
  Content: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    height: 180px;
    border-radius: 10px;
  `,
};
