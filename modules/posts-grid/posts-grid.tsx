import { FC, useState, useMemo } from 'react';
import cn from 'classnames';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import Grid from '@components/grid';
import Button from '@components/button';
import SaveTweetsBtn from '@modules/save-tweets-btn';
import { useGetUserTweets } from './hooks/use-get-user-tweets';
import styles from './posts-grid.module.css';

const PostsGrid: FC = () => {
  const [idsToSave, setIdsToSave] = useState<string[]>([]);
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isFetched } =
    useGetUserTweets();

  const tweetsToSave = useMemo(
    () => data?.filter((tweet) => idsToSave.some((id) => id === tweet.id)),
    [data, idsToSave],
  );

  if (!isFetched) {
    return <div className="center">Please, login to fetch tweets</div>;
  }

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  const onTweetClick = (tweetId: string) => {
    setIdsToSave((state) =>
      state.some((id) => id === tweetId)
        ? state.filter((id) => id !== tweetId)
        : state.concat(tweetId),
    );
  };

  return (
    <div>
      <Grid>
        {data?.map((tweet) => (
          <div
            onClick={() => onTweetClick(tweet.id)}
            className={cn(styles.posts_greed_card)}
            key={tweet.id}
          >
            {tweet.text}
            <div className={styles.check_container}>
              {idsToSave.some((id) => id === tweet.id) ? (
                <CheckCircleIconSolid className={styles.check_icon} />
              ) : (
                <CheckCircleIconOutline className={styles.check_icon} />
              )}
            </div>
          </div>
        ))}
      </Grid>
      <div className={styles.load_more_container}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetching || !hasNextPage}
        >
          {isFetching ? 'Fetching...' : 'Load more posts'}
        </Button>
        &nbsp;
        <SaveTweetsBtn
          tweetsToSave={tweetsToSave}
          afterSave={() => setIdsToSave([])}
        />
      </div>
    </div>
  );
};

export default PostsGrid;
