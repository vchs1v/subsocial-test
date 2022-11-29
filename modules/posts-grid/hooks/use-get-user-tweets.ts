import {
  useInfiniteQuery,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { types } from 'twitter-api-sdk';
import { useUserSession } from '@hooks/use-user-session';

export type TweetsData = types.TwitterResponse<types.usersIdTweets>;
type QueryResponse = { status: string; data: TweetsData }

type TUseGetUserTweets = () => {
  data?: TweetsData['data'];
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<QueryResponse>>
  hasNextPage?: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isFetched: boolean;
};

export const useGetUserTweets: TUseGetUserTweets = () => {
  const { user } = useUserSession();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isFetched } =
    useInfiniteQuery<QueryResponse>({
      queryKey: ['tweets'],
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetch(
            `/api/tweets?${new URLSearchParams({
              id: user?.id!,
              next_token: pageParam,
            })}`,
          );
          return res.json();
        } catch (e) {
          console.error(e);
          throw e;
        }
      },
      enabled: !!user?.id,
      getNextPageParam: (lastPage) => lastPage.data.meta?.next_token,
    });

  return {
    data: data?.pages.flatMap((page) => page.data.data) as TweetsData['data'],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetched,
  };
};
