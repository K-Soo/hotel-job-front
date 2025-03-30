import styled from 'styled-components';
import HelpSideMenu from '@/components/common/help/HelpSideMenu';
import HelpSectionTitle from '@/components/common/help/HelpSectionTitle';
import HelpContent from '@/components/common/help/HelpContent';
import HelpSearchBar from '@/components/common/help/HelpSearchBar';
import { HELP_FAQ } from '@/constants/help';
import HelpSectionTab from '@/components/common/help/HelpSectionTab';

export default function HelpFaq() {
  return (
    <S.HelpFaq>
      <HelpSideMenu />
      <article className="help-container">
        {/* PC */}
        <HelpSectionTitle title="자주 묻는 질문" />

        {/* MOBILE */}
        <HelpSectionTab />

        {/* <HelpSearchBar /> */}

        {HELP_FAQ.map((item, index) => (
          <HelpContent key={index} item={item} />
        ))}
      </article>
    </S.HelpFaq>
  );
}

const S = {
  HelpFaq: styled.div`
    display: flex;
    .help-container {
      flex: 1;
    }
  `,
};
