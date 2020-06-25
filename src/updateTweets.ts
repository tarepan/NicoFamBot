import { resolved, TweetStorage } from "./domain";
import { produce } from "immer";

export function updateTweetStatus(
  storage: TweetStorage,
  tweetID: number,
  status: resolved
): TweetStorage {
  return produce(storage, (draft) => {
    const index = draft.findIndex((tweet) => tweet.id === tweetID);
    draft[index].status = status;
  });
}
