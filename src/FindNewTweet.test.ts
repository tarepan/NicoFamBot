import { findNewTweets } from "./FindNewTweet";
import { TweetStorage, TwitterSearchResults } from "./domain";

describe("findNewTweets", () => {
  it("should find non-existing tweet", () => {
    const db: TweetStorage = [];
    const searchResult: TwitterSearchResults = [
      {
        id: "1",
      },
    ];
    expect(findNewTweets(searchResult, db)).toStrictEqual([
      {
        id: "1",
        status: "candidate",
        YouTubeOrigin: undefined,
      },
    ]);
  });

  it("should not find existing tweet", () => {
    const db: TweetStorage = [
      { id: "1", status: "candidate", YouTubeOrigin: undefined },
    ];
    const searchResult: TwitterSearchResults = [
      {
        id: "1",
      },
    ];
    expect(findNewTweets(searchResult, db)).toStrictEqual([]);
  });

  it("should find only non-existing tweet", () => {
    const db: TweetStorage = [
      { id: "1", status: "candidate", YouTubeOrigin: undefined },
      { id: "2", status: "candidate", YouTubeOrigin: undefined },
    ];
    const searchResult: TwitterSearchResults = [
      {
        id: "1",
      },
      {
        id: "3",
      },
    ];
    expect(findNewTweets(searchResult, db)).toStrictEqual([
      {
        id: "3",
        status: "candidate",
        YouTubeOrigin: undefined,
      },
    ]);
  });
});
