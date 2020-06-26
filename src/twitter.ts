import OAuth from "oauth-1.0a";
import crypto from "crypto";
import fetch, { Response } from "node-fetch";
import strictUriEncode from "strict-uri-encode";

export type RequestData = {
  method: "GET" | "POST";
  url: string;
};

/**
 * Request fetch toward Twitter
 * This func has correspondings to sign and fetch request (not response, because of Response type difference)
 * @param requestData
 * @param consumerKey
 * @param consumerSecret
 * @param tokenKey
 * @param tokenSecret
 */
export async function fetchTwitter(
  requestData: RequestData,
  consumerKey: string,
  consumerSecret: string,
  tokenKey: string,
  tokenSecret: string
): Promise<Response> {
  const oauth = new OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    signature_method: "HMAC-SHA1",
    // eslint-disable-next-line @typescript-eslint/camelcase
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });
  return await fetch(requestData.url, {
    method: requestData.method,
    headers: {
      ...oauth.toHeader(
        oauth.authorize(requestData, {
          key: tokenKey,
          secret: tokenSecret,
        })
      ),
    },
  });
}

if (require.main === module) {
  const msg = `how are you I am OK ? ${new Date().toTimeString()}`;
  const requestData: RequestData = {
    url: `https://api.twitter.com/1.1/statuses/update.json?status=${strictUriEncode(
      msg
    )}`,
    method: "POST",
  };
  fetchTwitter(
    requestData,
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder"
  )
    .then((res) => {
      console.log(res.status);
      return res.text();
    })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}
