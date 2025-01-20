export const appendQueryParams = (baseUrl: string, params: Record<string, any>): string => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (key !== 'url') {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};
