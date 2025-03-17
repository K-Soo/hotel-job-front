import { PaginationInfo } from '@/types/API';
import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseInfiniteScroll<T, Q> {
  queryKey: QueryKey;
  queryFn: (args: Q) => Promise<T>;
  options?: Omit<UseInfiniteQueryOptions<T, AxiosError, T, T, QueryKey>, 'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'>;
  initialPageParam?: number;
  requestQuery?: Omit<Q, 'page'>;
}

interface PaginatedResponse {
  result: {
    pagination: PaginationInfo;
  };
}

export default function useInfiniteScroll<T extends PaginatedResponse, Q>({
  queryKey,
  queryFn,
  options,
  initialPageParam,
  requestQuery,
}: UseInfiniteScroll<T, Q>) {
  const fetcher = async (pageParam: number) => {
    const data = await queryFn({ ...requestQuery, page: pageParam } as Q);
    return data;
  };

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    isSuccess,
    isPlaceholderData,
    isFetching,
    isError,
    isPaused,
    isPending,
    isRefetching,
    isFetchNextPageError,
    isFetchPreviousPageError,
    isFetched,
    isLoadingError,
    isRefetchError,
    isStale,
    status,
    refetch,
    isFetchedAfterMount,
  } = useInfiniteQuery({
    queryKey: queryKey,
    ...options,
    queryFn: ({ pageParam }) => fetcher(pageParam as number),
    initialPageParam: initialPageParam ?? 1,
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.result.pagination;
      return nextPage ?? null;
    },
  });

  return {
    data: data as InfiniteData<T> | undefined,
    isPending,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    isSuccess,
    status,
    refetch,
    isPlaceholderData,
    isFetching,
    isError,
    isPaused,
    isRefetching,
    isFetchNextPageError,
    isFetchPreviousPageError,
    isFetched,
    isLoadingError,
    isRefetchError,
    isStale,
    isFetchedAfterMount,
  };
}
