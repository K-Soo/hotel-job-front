import styled from 'styled-components';
import HelpSideMenu from '@/components/common/help/HelpSideMenu';
import HelpSectionTitle from '@/components/common/help/HelpSectionTitle';
import HelpContent from '@/components/common/help/HelpContent';
import HelpSearchBar from '@/components/common/help/HelpSearchBar';
import HelpSectionTab from '@/components/common/help/HelpSectionTab';
import { HELP_NOTICE } from '@/constants/help';

export default function HelpNotice() {
  return (
    <S.HelpNotice>
      <HelpSideMenu />
      <article className="help-container">
        {/* PC */}
        <HelpSectionTitle title="공지사항" />

        {/* MOBILE */}
        <HelpSectionTab />

        {/* <HelpSearchBar /> */}

        {HELP_NOTICE.map((item, index) => (
          <HelpContent key={index} item={item} />
        ))}
      </article>
    </S.HelpNotice>
  );
}

const S = {
  HelpNotice: styled.section`
    display: flex;
    .help-container {
      flex: 1;
    }
  `,
};
