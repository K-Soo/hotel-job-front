import React from 'react';
import styled from 'styled-components';
import { RecruitListItem } from '@/types';

interface RecruitPremiumCardProps {
  item: RecruitListItem;
}
// TODO - 유저 수 증가 이후에 추가
export default function RecruitPremiumCard({ item }: RecruitPremiumCardProps) {
  return <S.RecruitPremiumCard>RecruitPremiumCard</S.RecruitPremiumCard>;
}

const S = {
  RecruitPremiumCard: styled.div`
    width: calc(33.333% - 6.7px);
    aspect-ratio: 5/3;
    border-radius: 10px;
    padding: 15px;
    border: 1px solid ${(props) => props.theme.colors.blue400};
    cursor: pointer;
    display: flex;
    user-select: none;
    flex-direction: column;
    max-height: 180px;
    ${(props) => props.theme.media.tablet`
      aspect-ratio: 5 / 3;
      width: calc(50% - 5px);
    `};

    ${(props) => props.theme.media.mobile`
      width: calc(100%);
      aspect-ratio: 2 / 1;
    `};
  `,
};
