import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface PaginatedResponse {
  data: {
    page: number;
    page_size: number;
    total: number;
  };
}

interface UseInfiniteScroll<T, Q> {
  queryKey: QueryKey;
  queryFn: (args: Q) => Promise<T>;
  options?: Omit<UseInfiniteQueryOptions<T, AxiosError, T, T, QueryKey>, 'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'>;
  initialPageParam?: number;
  requestQuery?: Omit<Q, 'page'>;
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
    getNextPageParam: (lastPage, _allPages, _lastPageParam, _allPageParams) => {
      const { page, page_size, total } = lastPage.data;
      const totalPages = Math.ceil(total / page_size);
      return page < totalPages ? page + 1 : undefined;
    },
  });

  return {
    result: data as InfiniteData<T> | undefined,
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
