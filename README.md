# にこにこふぁみりーず bot

「もっとゆげちゃん成分を摂取したい！」  
そんなあなたのために、にこふぁみ bot があなたの TL へゆげちゃん成分をお届け.

## Contents

**切り抜き動画ツイート/ClipTweet**を RT

<!-- - VC Paper Introduction in [Twitter@VoiceConversion](https://twitter.com/VoiceConversion)
  - new VC paper candidate: offer you "latest" ArXiv VC paper candidates (within 1-hour after publication)
  - VC paper: confirmed to be "VC" paper by human eye -->

## System Overview

**Autonomous tweet candidate collection + community tweet review/confirmation**

ClipTweet information is automatically and routinely collected through Twitter Search in GitHub Actions.  
This information is collected as "candidate" in DB.  
Candidate information is collected in Issue of this repository, and community can comment "whether the tweet is clipTweet or not."  
Bot autonomously detect comment by community, then process the confirmation.

## Developments

Under 1st generation development.

## Reference

This project is based on [VClab](https://github.com/tarepan/VoiceConversionLab)
