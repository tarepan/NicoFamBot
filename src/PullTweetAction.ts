import * as core from "@actions/core";
import * as github from "@actions/github";
import { TweetStorage } from "./domain";
import { findNewTweets } from "./FindNewTweet";
import { searchTwitter } from "./SearchTwitter";

/**
 * Pull tweets through Twitter API, then store new ones
 */
async function run(): Promise<void> {
  // fetch search result
  const searchResults = await searchTwitter();

  // fetch storage
  const octokit = new github.GitHub(core.getInput("token"));
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

  // find new tweets
  const newTweetCand = findNewTweets(searchResults, storage);

  // open candidate check issue
  const ps = newTweetCand.map(async (tweet) => {
    await octokit.issues
      .create({
        ...github.context.repo,
        title: `clipTweet candidate ${tweet.id}`,
        body: `Please check whether this tweet is 'clip tweet of Ando UGE' or not.\n## tweet info.\n- id: ${tweet.id}\n## judge\nWrite [nicofam::confirmed], [nicofam::pending] or [nicofam::excluded] in comment ('pending' means 'is clipTweet, not suitable for retweet').`,
      })
      .catch((err) => core.setFailed(err));
    console.log("issue created.");
  });
  await Promise.all(ps);

  // storage update (run even if issue creation failed)
  storage.push(...newTweetCand);
  // commit storage update
  const blob = Buffer.from(JSON.stringify(storage, undefined, 2));
  await octokit.repos
    .createOrUpdateFile({
      ...github.context.repo,
      path: "tweets.json",
      message: `Add new tweets`,
      content: blob.toString("base64"),
      // @ts-ignore
      sha: contents.data.sha,
    })
    .catch((err) => core.setFailed(err));
  console.log("storage updated.");
}

run();
