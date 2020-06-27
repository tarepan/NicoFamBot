import strictUriEncode from "strict-uri-encode";
import { TwitterSearchResults, TwitterOneTimeSearchResult } from "./domain";
import { RequestData, fetchTwitter } from "./twitter";
import { ResTwitterSearch } from "./domainTwitter";
import { fail } from "assert";

/**
 * Search latest to old clipTweets through Twitter API with maxID
 * ※※
 * this not is working because of Twitter Search API limit.
 * The API limit search range (about latest 7 days), and it is applied including "w/ maxID" query.
 * ※※
 * @param consumerKey
 * @param consumerSecret
 * @param tokenKey
 * @param tokenSecret
 */
export async function searchTwitterOld(
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string,
  searchMaxID?: string
): Promise<TwitterOneTimeSearchResult> {
  // request params
  const searchQuery: string = strictUriEncode(
    `#杏戸ロイド filter:native_video exclude:retweets`
  );
  const count = 100;
  const maxIDstring = searchMaxID ? `&max_id=${searchMaxID}` : "";
  const queryString = `?q=${searchQuery}&count=${count}${maxIDstring}`;

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
    .then((result) => {
      const tweets: TwitterSearchResults = result.statuses
        .map((tweet) => tweet.id_str)
        .map((id) => ({ id: id }));
      const nextRegExp = /max_id=(\d+)/;
      console.log(result.search_metadata);
      const regExpResult = nextRegExp.exec(result.search_metadata.next_results);
      if (regExpResult === null) {
        fail("nextMaxID should exist");
      } else {
        return {
          twitterSearchResults: tweets,
          nextMaxID: regExpResult[1],
        };
      }
    });
}

if (require.main === module) {
  (async () => {
    await searchTwitterOld(
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "1273593325086314495"
    )
      .then((res) => {
        res.twitterSearchResults.map((v) =>
          console.log(`https://twitter.com/twitter/status/${v.id}`)
        );
        console.log(`nextMaxID: ${res.nextMaxID}`);
      })
      .catch((e) => console.log(e));
  })();
}
