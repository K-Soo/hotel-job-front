export const phoneNumberFormat = (phone: string): string => {
  // 숫자만 남기기
  const cleaned = phone.replace(/\D/g, '');

  return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
};
