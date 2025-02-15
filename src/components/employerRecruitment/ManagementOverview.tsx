import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import Button from '@/components/common/style/Button';
import { RecruitmentStatusKeys } from '@/types';
import { useRouter } from 'next/router';
import IconHover from '@/components/common/IconHover';

interface ManagementOverviewProps {
  id: string;
  status: RecruitmentStatusKeys;
  handleCloseRecruitment: (recruitmentId: string) => void;
}

export default function ManagementOverview({ id, status, handleCloseRecruitment }: ManagementOverviewProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const managementOverviewRef = React.useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    if (managementOverviewRef.current === relatedTarget) {
      setIsDropdownOpen(false);
    }
    setIsDropdownOpen(false);
  };

  if (status === 'DRAFT' || status === 'CLOSED') {
    return <span>{'-'}</span>;
  }
  return (
    <S.ManagementOverview onBlur={handleBlur} tabIndex={0} ref={managementOverviewRef}>
      <IconHover width="30px" height="30px" margin="0 auto" onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <Icon name="Dots24x24" width="18px" height="18px" style={{ transform: 'rotate(90deg)', color: '#555' }} />
      </IconHover>

      {isDropdownOpen && (
        <DropdownTemplate
          ref={dropdownRef}
          outStyle={{ height: 'auto', paddingTop: '0' }}
          innerStyle={{ border: 'none', boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1)', padding: '15px 10px' }}
        >
          <Button
            variant="secondary100"
            height="28px"
            label="수정"
            fontSize="13px"
            type="button"
            onClick={() => router.push(`/employer/recruitment/${id}`)}
          />

          {status === 'PROGRESS' && (
            <Button
              variant="checkoutOutline"
              height="28px"
              label="마감"
              fontSize="13px"
              margin="8px 0 0 0"
              onClick={() => handleCloseRecruitment(id)}
            />
          )}
        </DropdownTemplate>
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
