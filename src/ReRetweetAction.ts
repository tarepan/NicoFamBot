import * as core from "@actions/core";
import * as github from "@actions/github";
import { TweetStorage } from "./domain";
import { unRetweet } from "./UnRetweet";
import { retweet } from "./retweet";
import { pickRandomly } from "./RandomPick";

/**
 * Re-Retweet a random clipTweet
 */
async function run(): Promise<void> {
  const octokit = new github.GitHub(core.getInput("token"));

  // fetch storage
  const contents = await octokit.repos.getContents({
    ...github.context.repo,
    path: "tweets.json",
  });
  const storage: TweetStorage = JSON.parse(
    Buffer.from(
      //@ts-ignore
      contents.data.content,
      //@ts-ignore
      contents.data.encoding
    ).toString()
  );

  // random select
  // [todo]
  const confirmeds = storage.filter((tweet) => tweet.status === "confirmed");
  const index = pickRandomly(confirmeds.length);
  const tweetID = confirmeds[index].id;

  // Re-Retweet
  await unRetweet(
    tweetID,
    core.getInput("twi-cons-key"),
    core.getInput("twi-cons-secret"),
    core.getInput("twi-token-key"),
    core.getInput("twi-token-secret")
  ).catch((err) => {
    core.setFailed(err);
  });

  // ReRetweet the tweet
  await retweet(
    tweetID,
    core.getInput("twi-cons-key"),
    core.getInput("twi-cons-secret"),
    core.getInput("twi-token-key"),
    core.getInput("twi-token-secret")
  ).catch((err) => {
    core.setFailed(err);
  });
  console.log("re-retweeted.");
}

run();
