import React from 'react';
import styled from 'styled-components';
import Icon from '@/icons/Icon';
import IconDimmed from '@/components/common/IconDimmed';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import Button from '@/components/common/style/Button';
import { RecruitmentStatusKeys } from '@/types';
import { useRouter } from 'next/router';

interface ManagementOverviewProps {
  id: string;
  status: RecruitmentStatusKeys;
}

export default function ManagementOverview({ id, status }: ManagementOverviewProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const managementOverviewRef = React.useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    console.log('relatedTarget: ', relatedTarget);
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    if (managementOverviewRef.current === relatedTarget) {
      setIsDropdownOpen(false);
    }
    setIsDropdownOpen(false);
  };

  if (status === 'DRAFT') {
    return <span>{'-'}</span>;
  }
  return (
    <S.ManagementOverview onBlur={handleBlur} tabIndex={0} ref={managementOverviewRef}>
      <IconDimmed>
        <Icon
          name="Dots24x24"
          width="18px"
          height="18px"
          style={{ transform: 'rotate(90deg)' }}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        />
      </IconDimmed>

      {isDropdownOpen && (
        <DropdownTemplate
          ref={dropdownRef}
          outStyle={{ height: 'auto', paddingTop: '0' }}
          innerStyle={{ border: 'none', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', padding: '15px 10px' }}
        >
          {true && (
            <Button
              variant="tertiary"
              height="28px"
              label="수정"
              fontSize="13px"
              type="button"
              onClick={() => router.push(`/employer/recruitment/${id}`)}
            />
          )}

          {status === 'PROGRESS' && <Button variant="tertiary" height="28px" label="마감" fontSize="13px" margin="8px 0 0 0" />}
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
