import strictUriEncode from "strict-uri-encode";
import { TwitterSearchResults } from "./domain";
import { RequestData, fetchTwitter } from "./twitter";
import { Tweet } from "./domainTwitter";

export type ResTwitterSearch = {
  statuses: Tweet[];
  search_metadata: {
    completed_in: number;
    max_id: number;
    max_id_str: string;
    next_results: "?max_id=1124690280777699327&q=from%3Atwitterdev&count=2&include_entities=1&result_type=mixed";
    query: "from%3Atwitterdev";
    refresh_url: "?since_id=1125490788736032770&q=from%3Atwitterdev&result_type=mixed&include_entities=1";
    count: number;
    since_id: number;
    since_id_str: string;
  };
};

export async function searchTwitter(
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string
): Promise<TwitterSearchResults> {
  // request params
  const since = "2020-01-01";
  const until = "2020-12-31";
  const searchQuery: string = strictUriEncode(
    `#杏戸ロイド filter:native_video exclude:retweets since:${since} until:${until}`
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
    await searchTwitter(
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
