import { RequestData, fetchTwitter } from "./twitter";

/**
 * Retweet
 * Duplicated retweet (retweet of already-retweeted original tweet) seems to be causing '403 Fobbiden'
 * It is not compatible with [official doc](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id),
 * but it is indicated in [stack overflow](https://stackoverflow.com/questions/28019656/what-is-the-exact-reason-behind-twitter-api-403-statuscode)
 * @param originalTweetID - original tweet, which is retweeted
 * @param consumerKey
 * @param consumerSecret
 * @param tokenKey
 * @param tokenSecret
 */
export async function retweet(
  originalTweetID: string,
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string
): Promise<any> {
  // fetch params
  const requestData: RequestData = {
    method: "POST",
    url: `https://api.twitter.com/1.1/statuses/retweet/${originalTweetID}.json`,
  };

  // fetch
  return await fetchTwitter(
    requestData,
    consumerKey,
    consumerSecret,
    tokenKey,
    tokenSecret
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 403) {
        throw new Error(
          "403 Forbidden: Twitter API RateLimit or forbidden retweet (including duplicated retweet.)"
        );
      } else {
        throw new Error(res.statusText);
      }
    }
  });
}

if (require.main === module) {
  retweet(
    "1234567891023",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
  )
    .then((v) => {
      const z = v;
    })
    .catch((e) => console.log(e));
}
