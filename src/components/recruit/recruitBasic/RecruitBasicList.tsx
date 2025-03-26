import styled from 'styled-components';
import RecruitSectionTitle from '@/components/recruit/RecruitSectionTitle';

interface RecruitBasicListProps {
  children: React.ReactNode;
}

export default function RecruitBasicList({ children }: RecruitBasicListProps) {
  return <S.RecruitBasicList>{children}</S.RecruitBasicList>;
}

const S = {
  RecruitBasicList: styled.article``,
};
