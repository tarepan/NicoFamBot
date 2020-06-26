import { TwitterSearchResults, TweetStorage, TweetRecord } from "./domain";

/**
 * Find new tweet from search result based on registered tweets DB
 * @param searchResults
 * @param storage
 */
export const findNewTweets = (
  searchResults: TwitterSearchResults,
  storage: TweetStorage
): TweetRecord[] =>
  searchResults
    // find non-match (==new) tweet
    .filter((tweet) => storage.every((record) => record.id !== tweet.id))
    .map((tweet) => {
      const record: TweetRecord = {
        id: tweet.id,
        status: "candidate",
        YouTubeOrigin: undefined,
      };
      return record;
    });
