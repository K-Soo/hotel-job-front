import styled from 'styled-components';

interface RecruitBasicListProps {
  children: React.ReactNode;
}

export default function RecruitBasicList({ children }: RecruitBasicListProps) {
  return <S.RecruitBasicList>{children}</S.RecruitBasicList>;
}

const S = {
  RecruitBasicList: styled.article``,
};
