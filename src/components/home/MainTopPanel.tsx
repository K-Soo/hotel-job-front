import styled from 'styled-components';
import JobCategory from '@/components/home/JobCategory';
import Member from '@/components/home/Member';
import EmployerBenefitBanner from '@/components/common/banner/EmployerBenefitBanner';
import WageBanner from '@/components/common/banner/WageBanner';
import JobSearch from '@/components/recruit/recruitSearch/JobSearch';
import RecruitSearch from '@/components/recruit/recruitSearch';

export default function MainTopPanel() {
  return (
    <article className="bg-gray-30 px-[15px] py-[35px] lg:px-0">
      <RecruitSearch>
        <JobSearch />
        {/* <LocationSearch /> */}
      </RecruitSearch>

      <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-[20px] md:flex-row">
        <JobCategory />
        <div className="flex shrink-0 grow-1 flex-col md:gap-[20px]">
          <div className="flex flex-1 gap-[20px]">
            <WageBanner />

            <Member />
          </div>

          <EmployerBenefitBanner />
        </div>
      </div>
    </article>
  );
}
