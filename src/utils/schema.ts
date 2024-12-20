import * as yup from 'yup';

export const schema = {};

const schemas = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required();
