import styled from 'styled-components';
import { useForm, FormProvider, SubmitHandler, useFormContext, useFieldArray } from 'react-hook-form';
import { Person } from '@/containers/employerRecruitmentRegisterContainer';
import { motion } from 'framer-motion';

interface RecruitmentJobConditionAdditionalProps {}

export default function RecruitmentJobConditionAdditional({}: RecruitmentJobConditionAdditionalProps) {
  const { control, register, formState, setValue, watch, reset, resetField } = useFormContext();

  return (
    <S.RecruitmentJobConditionAdditional>
      <motion.button className="item" type="button" animate={false ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}>
        근무요일
      </motion.button>

      <motion.button className="item" type="button" animate={false ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}>
        출퇴근 시간
      </motion.button>
    </S.RecruitmentJobConditionAdditional>
  );
}

const S = {
  RecruitmentJobConditionAdditional: styled.div`
    height: auto;
    flex: 1;
    display: flex;
    height: 40px;
    .item {
      text-align: center;
      height: 100%;
      flex: 1;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      margin-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray700};
      cursor: pointer;
    }
  `,
};
