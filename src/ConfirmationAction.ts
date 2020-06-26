import * as core from "@actions/core";
import * as github from "@actions/github";
import * as WebhooksApi from "@octokit/webhooks";
import { updateTweetStatus } from "./updateTweets";
import { TweetStorage } from "./domain";
import { fail } from "assert";
import { unRetweet } from "./UnRetweet";
import { retweet } from "./retweet";

async function run(): Promise<void> {
  //@ts-ignore
  const issueCommentPayload: WebhooksApi.WebhookPayloadIssueComment =
    github.context.payload;

  // extract id
  const idRegExp = /id: ([\d]+)/;
  const regResult = idRegExp.exec(issueCommentPayload.issue.body);
  // regResult == null means the issue is not for article confirmation
  if (regResult != null) {
    const tweetID = regResult[1];

    // extract judge
    const c = /\[nicofam::confirmed\]|nicofam::confirmed/;
    const p = /\[nicofam::pending\]|nicofam::pending/;
    const e = /\[nicofam::excluded\]|nicofam::excluded/;

    const isC = c.exec(issueCommentPayload.comment.body);
    const isP = p.exec(issueCommentPayload.comment.body);
    const isE = e.exec(issueCommentPayload.comment.body);

    // make thanks toward contribution
    if (isC !== null || isP !== null || isE !== null) {
      const octokit = new github.GitHub(core.getInput("token"));
      // reply thunks in comment
      await octokit.issues
        .createComment({
          ...github.context.repo,
          // eslint-disable-next-line @typescript-eslint/camelcase
          issue_number: issueCommentPayload.issue.number,
          body: `Thunk you very much for contribution!\nYour judgement is refrected in [tweets.json](https://github.com/tarepan/NicoFamBot/blob/master/tweets.json), and is going to be used for NicoFamBot's activity.\nThunk you so much.`,
        })
        .catch((err) => core.setFailed(err));
      // close the issue
      octokit.issues.update({
        ...github.context.repo,
        // eslint-disable-next-line @typescript-eslint/camelcase
        issue_number: issueCommentPayload.issue.number,
        state: "closed",
      });

      // update store
      //// fetch storage
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
      //// update storage
      const judgeResult =
        isC !== null ? "confirmed" : isP !== null ? "pending" : "excluded";
      const newStorage = updateTweetStatus(storage, tweetID, judgeResult);
      //// commit storage update
      const blob = Buffer.from(JSON.stringify(newStorage, undefined, 2));
      await octokit.repos
        .createOrUpdateFile({
          ...github.context.repo,
          path: "tweets.json",
          message: `Add tweet confirmation ${tweetID}`,
          content: blob.toString("base64"),
          // @ts-ignore
          sha: contents.data.sha,
        })
        .catch((err) => core.setFailed(err));

      // Retweet if "confirmed" (== VC paper)
      if (isC !== null) {
        console.log("is [nicofam::confirmed]");

        // [todos]
        // unRetweet the tweet
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
      } else if (isP !== null) {
        console.log("is [nicofam::pending]");
      } else if (isE !== null) {
        console.log("is [nicofam::excluded]");
      } else {
        fail("type error");
      }
    } else {
      console.log("non confirmation comment");
    }
  }
}

run();
