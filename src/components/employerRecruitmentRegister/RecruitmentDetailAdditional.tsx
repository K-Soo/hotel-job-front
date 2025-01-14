import styled from 'styled-components';
import { useForm, FormProvider, SubmitHandler, useFormContext, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';

interface RecruitmentDetailAdditionalProps {
  additionalTabs: Record<string, boolean>;
  handleClickToggleButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RecruitmentDetailAdditional({ additionalTabs, handleClickToggleButton }: RecruitmentDetailAdditionalProps) {
  // const { control, register, formState, setValue, watch, reset, resetField } = useFormContext();

  return (
    <S.RecruitmentDetailAdditional>
      <motion.button
        className="button-group__item"
        type="button"
        name="preferences"
        onClick={handleClickToggleButton}
        animate={additionalTabs.preferences ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        우대조건
      </motion.button>

      <motion.button
        className="button-group__item"
        type="button"
        name="department"
        onClick={handleClickToggleButton}
        animate={additionalTabs.department ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        근무부서
      </motion.button>

      <motion.button
        className="button-group__item"
        type="button"
        name="position"
        onClick={handleClickToggleButton}
        animate={additionalTabs.position ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        직급
      </motion.button>
    </S.RecruitmentDetailAdditional>
  );
}

const S = {
  RecruitmentDetailAdditional: styled.div`
    height: auto;
    flex: 1;
    display: flex;
    height: 40px;
    .button-group {
      display: flex;
      width: 100%;
      height: 40px;
      &__item {
        text-align: center;
        height: 100%;
        flex: 1;
        border: 1px solid ${({ theme }) => theme.colors.gray300};
        margin-right: 5px;
        border-radius: 5px;
        font-size: 14px;
        color: ${(props) => props.theme.colors.gray700};
        cursor: pointer;
        /* background-color: ${(props) => props.theme.colors.blue}; */

        &:hover {
          border: 1px solid ${(props) => props.theme.colors.blue100};
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  `,
};
