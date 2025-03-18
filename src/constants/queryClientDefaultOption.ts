export const queryClientDefaultOption = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 1000 * 5,
      throwOnError: false,
      retry: 0,
      suspense: false,
    },
  },
};
