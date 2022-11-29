import { FC } from 'react';
import Button from '@components/button';
import { useSaveTweets } from './hooks/use-save-tweets';
import { TweetsData } from '@modules/posts-grid';

interface ISaveTweetsBtnProps {
  afterSave?: () => void;
  tweetsToSave: TweetsData['data'];
}

const SaveTweetsBtn: FC<ISaveTweetsBtnProps> = ({
  tweetsToSave = [],
  afterSave,
}) => {
  const { saveTweets, isLoading } = useSaveTweets({ tweetsToSave, afterSave });

  const disabled = isLoading || tweetsToSave.length === 0;
  return (
    <Button onClick={saveTweets} disabled={disabled}>
      {isLoading ? 'Loading...' : `Save tweets ${tweetsToSave.length}`}
    </Button>
  );
};

export default SaveTweetsBtn;
