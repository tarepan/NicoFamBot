import strictUriEncode from "strict-uri-encode";
import { TwitterSearchResults } from "./domain";
import { RequestData, fetchTwitter } from "./twitter";
import { ResTwitterSearch } from "./domainTwitter";

/**
 * Search latest clipTweets through Twitter API
 * Search API check only latest tweets (around 7 days)
 * @param consumerKey
 * @param consumerSecret
 * @param tokenKey
 * @param tokenSecret
 */
export async function searchTwitterLatest(
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string
): Promise<TwitterSearchResults> {
  // request params
  const searchQuery: string = strictUriEncode(
    `#杏戸ロイド filter:native_video exclude:retweets`
  );
  const count = 100;

  const queryString = `?q=${searchQuery}&count=${count}`;

  // fetch params
  const requestData: RequestData = {
    method: "GET",
    url: `https://api.twitter.com/1.1/search/tweets.json${queryString}`,
  };

  // fetch
  return await fetchTwitter(
    requestData,
    consumerKey,
    consumerSecret,
    tokenKey,
    tokenSecret
  )
    .then((res) => {
      if (res.ok) {
        console.log(res.status);
        return res.json() as Promise<ResTwitterSearch>;
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((result) =>
      result.statuses.map((tweet) => tweet.id_str).map((id) => ({ id: id }))
    );
}

if (require.main === module) {
  (async () => {
    await searchTwitterLatest(
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder"
    )
      .then((res) =>
        res.map((v) =>
          console.log(`https://twitter.com/twitter/status/${v.id}`)
        )
      )
      .catch((e) => console.log(e));
  })();
}
