import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormInput from '@/components/common/form/FormInput';
import { Auth } from '@/apis';
import queryKeys from '@/constants/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';

type NicknameFormType = {
  newNickname: string;
};

interface ChangeNicknameFormProps {
  handleCloseModal: () => void;
}

export default function ChangeNicknameForm({ handleCloseModal }: ChangeNicknameFormProps) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const methods = useForm<NicknameFormType>({
    resolver: yupResolver(schema.nicknameSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      newNickname: '',
    },
  });

  React.useEffect(() => {
    methods.setFocus('newNickname');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<NicknameFormType> = async (submitData, event) => {
    event?.preventDefault();
    try {
      const response = await Auth.patchChangeNickname({ newNickname: submitData.newNickname });
      console.log('닉네임 변경 API : ', response);
      if (response.result.status !== 'success') {
        return methods.setError('newNickname', { type: 'custom', message: '사용할 수 없는 닉네임입니다.' });
      }
      addToast({ type: 'success', message: '닉네임이 변경되었습니다.' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.USER_PROFILE], refetchType: 'all' });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYER_ACCOUNT], refetchType: 'all' });
      window.location.reload();
      handleCloseModal();
    } catch (error) {
      alert('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <FormProvider {...methods}>
      <S.ChangeNicknameForm>
        <form className="nickname-form" onSubmit={methods.handleSubmit(onSubmit)}>
          <p className="nickname-form__desc">변경할 닉네임을 입력해주세요.</p>
          <FormInput<NicknameFormType> name="newNickname" width="330px" maxLength={10} margin="0 0 30px 0" placeholder="닉네임" />
          <Button
            type="submit"
            label="변경하기"
            variant="primary"
            height="45px"
            width="200px"
            fontSize="16px"
            margin="20px 0 0 0"
            isLoading={methods.formState.isSubmitting}
          />
        </form>
      </S.ChangeNicknameForm>
    </FormProvider>
  );
}

const S = {
  ChangeNicknameForm: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nickname-form {
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__desc {
        font-size: 18px;
        color: ${({ theme }) => theme.colors.black400};
        margin-bottom: 15px;
        font-weight: 500;
      }
    }
  `,
};
