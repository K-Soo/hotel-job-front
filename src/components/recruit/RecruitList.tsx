import styled from "styled-components";
import RecruitCard from "@/components/recruit/RecruitCard";

interface RecruitListProps {}

export default function RecruitList({}: RecruitListProps) {
  const recruitArray = Array.from({ length: 100 });

  return (
    <S.RecruitList>
      {recruitArray.map((_, index) => (
        <S.RecruitList key={index}>
          <RecruitCard />
        </S.RecruitList>
      ))}
    </S.RecruitList>
  );
}

const S = {
  RecruitList: styled.div`
    /* border: 1px solid red; */
  `,
};
