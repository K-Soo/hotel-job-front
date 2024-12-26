import styled from 'styled-components';

interface RecruitDetailFavoriteShareBarProps {}

export default function RecruitDetailFavoriteShareBar({}: RecruitDetailFavoriteShareBarProps) {
  return (
    <S.RecruitDetailFavoriteShareBar>
      <span>즐겨찾기</span>
      <button>공유하기</button>
    </S.RecruitDetailFavoriteShareBar>
  );
}

const S = {
  RecruitDetailFavoriteShareBar: styled.div``,
};
