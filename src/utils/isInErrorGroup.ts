export const isInErrorGroup = (group: string[], code: string | null): boolean => {
  return !!code && group.includes(code);
};
