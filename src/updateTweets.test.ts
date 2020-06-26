import { updateTweetStatus } from "./updateTweets";
import { TweetStorage } from "./domain";

describe("updateTweetStatus", () => {
  it("should update only corresponding status", () => {
    const storage: TweetStorage = [
      {
        id: "1",
        status: "candidate",
        YouTubeOrigin: undefined,
      },
      {
        id: "2",
        status: "candidate",
        YouTubeOrigin: undefined,
      },
    ];
    const expected: TweetStorage = [
      {
        id: "1",
        status: "candidate",
        YouTubeOrigin: undefined,
      },
      {
        id: "2",
        status: "confirmed",
        YouTubeOrigin: undefined,
      },
    ];
    expect(updateTweetStatus(storage, "2", "confirmed")).toStrictEqual(
      expected
    );
  });
});
