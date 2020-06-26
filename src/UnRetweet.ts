import { RequestData, fetchTwitter } from "./twitter";

/**
 * Disable retweet
 * Duplicated unRetweet is accepted and simply ignored
 * @param originalTweetID - original tweet, which is retweeted
 * @param consumerKey
 * @param consumerSecret
 * @param tokenKey
 * @param tokenSecret
 */
export async function unRetweet(
  originalTweetID: string,
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string
): Promise<any> {
  // fetch params
  const requestData: RequestData = {
    method: "POST",
    url: `https://api.twitter.com/1.1/statuses/unretweet/${originalTweetID}.json`,
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
      throw new Error(res.statusText);
    }
  });
}

if (require.main === module) {
  (async () => {
    await unRetweet(
      "127",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder"
    )
      .then((v) => {
        const z = v;
      })
      .catch((e) => console.log(e));
  })();
}
