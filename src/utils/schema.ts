import * as yup from 'yup';
import { validation } from '@/utils/validation';

const signInSchema = yup.object({
  userId: validation.USER_ID,
  password: validation.PASSWORD,
});

const resumeRegister = yup.object({});

export const schema = { signInSchema, resumeRegister };
