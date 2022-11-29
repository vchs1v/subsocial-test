import { useState } from 'react';
import { TweetsData } from '@modules/posts-grid';

type TUseSaveTweets = (options: {
  afterSave?: () => void;
  tweetsToSave: TweetsData['data'];
}) => {
  isLoading: boolean;
  saveTweets: () => Promise<any>;
};

export const useSaveTweets: TUseSaveTweets = ({ afterSave, tweetsToSave }) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveTweets = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/subsocial/save-tweets', {
        method: 'POST',
        body: JSON.stringify(tweetsToSave),
      });
  
      setIsLoading(false);
      afterSave && afterSave();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    saveTweets,
  };
};
