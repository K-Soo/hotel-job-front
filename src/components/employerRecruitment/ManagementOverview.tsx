import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import { RecruitmentStatusKeys } from '@/types';
import IconHover from '@/components/common/IconHover';
import ManagementConfigDropdown from '@/components/employerRecruitment/ManagementConfigDropdown';

interface ManagementOverviewProps {
  id: string;
  status: RecruitmentStatusKeys;
  handleCloseRecruitment: (recruitmentId: string) => void;
  handleClickDeleteRecruitment: (ids: string[]) => Promise<void>;
  handleClickCopyRecruitment: (recruitmentId: string) => void;
}

export default function ManagementOverview({
  id,
  status,
  handleCloseRecruitment,
  handleClickDeleteRecruitment,
  handleClickCopyRecruitment,
}: ManagementOverviewProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (status === 'CLOSED') {
    return null;
  }

  return (
    <S.ManagementOverview>
      <IconHover width="30px" height="30px" margin="0 auto" onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <Icon name="Dots24x24" width="18px" height="18px" style={{ transform: 'rotate(90deg)', color: '#555' }} />
      </IconHover>

      {isDropdownOpen && (
        <ManagementConfigDropdown
          ref={dropdownRef}
          id={id}
          status={status}
          handleCloseRecruitment={handleCloseRecruitment}
          handleClickDeleteRecruitment={handleClickDeleteRecruitment}
          handleClickCopyRecruitment={handleClickCopyRecruitment}
        />
      )}
    </S.ManagementOverview>
  );
}

const S = {
  ManagementOverview: styled.div`
    position: relative;
    user-select: none;
  `,
};
