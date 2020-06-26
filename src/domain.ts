// searched tweet, which is used in several purpose
export type SearchedTweet = {
  id: string; // number, but cannot handled in Int range
};
export type TwitterSearchResults = SearchedTweet[];

// stored tweet, which contain details
export type status = candidate | resolved;
export type candidate = "candidate";
export type resolved = "confirmed" | "pending" | "excluded";

export type TweetRecord = {
  id: string; // number, but cannot handled in Int range
  status: status;
  YouTubeOrigin: string | undefined;
};
export type TweetStorage = TweetRecord[];
