import { AxiosError } from 'axios';
import { QueryKey, UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';

// 상태: loading이 pending으로 변경되었고, isLoading은 isPending으로 변경되었습니다. 또한, isInitialLoading은 이제 isLoading으로 이름이 바뀌었습니다.
// loading 상태는 pending으로 이름이 변경되었으며, 마찬가지로 isLoading 플래그도 isPending으로 이름이 변경되었습니다.
// 또한, 뮤테이션(mutations)의 경우에도 상태가 loading에서 pending으로 변경되었고, isLoading 플래그가 isPending으로 변경되었습니다.
// 마지막으로, 쿼리(queries)에 새로운 isLoading 플래그가 추가되었습니다. 이 플래그는 isPending && isFetching으로 구현됩니다. 이는 isLoading과 isInitialLoading이 동일한 역할을 하지만, isInitialLoading은 이제 사용되지 않으며 다음 주요 버전에서 제거될 예정이라는 것을 의미합니다.

export interface UseFetchQuery<T, Q = undefined> {
  queryKey: QueryKey;
  queryFn: (args: Q) => Promise<T>;
  options?: Omit<UseQueryOptions<any, AxiosError<unknown, any>, any, QueryKey>, 'queryKey' | 'queryFn'>;
  requestQuery?: Q;
}

export default function useSuspenseFetchQuery<T, Q = undefined>({ queryKey, queryFn, options, requestQuery }: UseFetchQuery<T, Q>) {
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isInitialLoading,
    isLoading, //isInitialLoading
    isLoadingError,
    isPaused,
    isPending,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    status,
  } = useSuspenseQuery<T, AxiosError>({
    queryKey: queryKey,
    queryFn: () => queryFn(requestQuery as Q),
    ...options,
  });

  return {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPending,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    status,
  };
}
