import { TwitterSearchResults } from "./domain";

export async function searchTwitter(): Promise<TwitterSearchResults> {
  // const res = await fetch(
  //     'http://export.arxiv.org/api/query?search_query="voice+conversion"&max_results=1000'
  //   );
  //   const resTxt = await res.text();
  //   const resJson = JSON.parse(
  //     xml2json(resTxt, {
  //       compact: true
  //     })
  //   );

  return [];
}

if (require.main === module) {
  //   (async () => {
  //     const res = await searchArXivByID("1012.1416v1");
  //     const x = 1;
  //   })();
}
