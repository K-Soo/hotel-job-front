import React from "react";
import Recruit from "@/components/recruit";
import RecruitListContainer from "@/containers/recruitContainer/RecruitListContainer";
import RecruitCategory from "@/components/recruit/RecruitCategory";
import SearchForm from "@/components/common/SearchForm";

export default function RecruitContainer() {
  return (
    <Recruit>
      <SearchForm />
      <RecruitCategory />
      <RecruitListContainer />
    </Recruit>
  );
}
