import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { Link } from 'react-scroll';
import Icon from '@/icons/Icon';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RecruitmentDetailForm } from '@/types';
import { PROGRESS_MENU } from '@/constants/recruitment';

interface RecruitmentRegisterProgressMenuProps {
  children: React.ReactNode;
}

function RecruitmentRegisterProgressMenu({ children }: RecruitmentRegisterProgressMenuProps) {
  const { watch } = useFormContext<RecruitmentDetailForm>();

  const recruitmentStatusWatchValue = watch('recruitmentStatus');

  return (
    <S.RecruitmentRegisterProgressMenu>
      <S.MenuForm>
        <div className="list-container">
          {PROGRESS_MENU.map((menu) => (
            <Link key={menu.id} id={menu.id} className="list-container__item" to={menu.id} smooth={true} offset={-100} duration={500}>
              {/* <i>ico</i> */}
              <span>{menu.title}</span>
            </Link>
          ))}
        </div>
      </S.MenuForm>
      {children}
      <Button label="미리보기" variant="tertiary" />
    </S.RecruitmentRegisterProgressMenu>
  );
}

export default React.memo(RecruitmentRegisterProgressMenu);

const S = {
  RecruitmentRegisterProgressMenu: styled.aside`
    position: sticky;
    top: 90px;
    width: 250px;
    margin-left: 30px;
    max-height: fit-content;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  MenuForm: styled.div`
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 0 15px;
    margin-bottom: 15px;
    .list-container {
      display: flex;
      flex-direction: column;
      &__item {
        font-size: 15px;
        height: 45px;
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.gray600};
        font-weight: 500;
        cursor: pointer;
        &:hover {
          color: ${(props) => props.theme.colors.blue400};
        }
      }
    }
  `,
  DraftDateForm: styled.div`
    margin-top: 10px;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    color: ${(props) => props.theme.colors.black400};
    .text {
      padding-left: 5px;
    }
  `,
};
