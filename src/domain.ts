// searched tweet, which is used in several purpose
export type SearchedTweet = {
  id: number;
};
export type TwitterSearchResults = SearchedTweet[];

// stored tweet, which contain details
export type status = candidate | resolved;
export type candidate = "candidate";
export type resolved = "confirmed" | "pending" | "excluded";

export type TweetRecord = {
  id: number;
  status: status;
  YouTubeOrigin: string | undefined;
};
export type TweetStorage = TweetRecord[];
