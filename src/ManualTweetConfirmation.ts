import fs from "fs";
import { TweetStorage, TweetRecord } from "./domain";

export type ManualConfirmedTweets = {
  confirmed: [string];
  pending: [string];
  excluded: [string];
};

// how to use:
//   1. prepare 'manualTweets.json' (Type: ManualConfirmedTweets) under root directory
//   2. run this file
//   3. copy result in tweetsPlus.json to tweets.json (this is for safety)

// storage load
const tweetsText = fs.readFileSync("./tweets.json", { encoding: "utf8" });
const tweets = JSON.parse(tweetsText) as TweetStorage;

// new tweets load
const newTweetsText = fs.readFileSync("./manualTweets.json", {
  encoding: "utf8",
});
const newTweets = JSON.parse(newTweetsText) as ManualConfirmedTweets;

// transform and merge
const confirmeds = newTweets.confirmed.map(
  (id) =>
    ({
      id: id,
      status: "confirmed",
      YouTubeOrigin: undefined,
    } as TweetRecord)
);
tweets.push(...confirmeds);

const pendings = newTweets.pending.map(
  (id) =>
    ({
      id: id,
      status: "pending",
      YouTubeOrigin: undefined,
    } as TweetRecord)
);
tweets.push(...pendings);

const excludeds = newTweets.excluded.map(
  (id) =>
    ({
      id: id,
      status: "excluded",
      YouTubeOrigin: undefined,
    } as TweetRecord)
);
tweets.push(...excludeds);

fs.writeFileSync("./tweetsPlus.json", JSON.stringify(tweets, undefined, 2));
