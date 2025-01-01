import styled from 'styled-components';
import { useForm, FormProvider, SubmitHandler, useFormContext, useFieldArray } from 'react-hook-form';
import { Person } from '@/containers/employerRecruitmentRegisterContainer';
import { motion } from 'framer-motion';

interface RecruitmentDetailAdditionalProps {}

export default function RecruitmentDetailAdditional({}: RecruitmentDetailAdditionalProps) {
  const { control, register, formState, setValue, watch, reset, resetField } = useFormContext();

  const departmentValue = watch('department');
  const positionValue = watch('position');

  const { append, fields, insert, move, prepend, remove, replace, swap, update } = useFieldArray<Person>({
    name: 'users',
  });

  const { append: appendJob, fields: jobFields } = useFieldArray<Person>({
    name: 'users',
  });

  const handleToggleFields = () => {
    if (fields.length === 0) {
      append({ name: '', age: 0 });
    } else {
      // 필드가 있으면 모두 삭제
      remove(); // 인덱스 없이 호출하면 모든 필드가 삭제됩니다.
    }
  };

  const handleToggleDepartment = () => {
    if (departmentValue) {
      return setValue('department', undefined);
    }
    setValue('department', { label: '근무부서', value: '' });
  };

  const handleTogglePositionValue = () => {
    if (positionValue) {
      return setValue('position', undefined);
    }
    setValue('position', { label: '근무부서', value: '' });
  };

  return (
    <S.RecruitmentDetailAdditional>
      <motion.button
        className="button-group__item"
        type="button"
        onClick={handleToggleDepartment}
        animate={departmentValue ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        근무부서
      </motion.button>

      <motion.button
        className="button-group__item"
        type="button"
        onClick={handleTogglePositionValue}
        animate={positionValue ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        직급
      </motion.button>

      <motion.button
        className="button-group__item"
        type="button"
        onClick={handleTogglePositionValue}
        animate={positionValue ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
      >
        우대조건
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
