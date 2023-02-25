Archived.  
EoL: 2023-02-25  

# にこにこふぁみりーず bot

「もっとゆげちゃん成分を摂取したい！」  
そんなあなたのために、にこふぁみ bot があなたの TL へゆげちゃん成分をお届け.

## Contents

- 切り抜き動画ツイート/ClipTweet を RT in [Twitter@にこふぁみ Clips](https://twitter.com/NicoFamBot)

## System Overview

**Autonomous tweet candidate collection + community tweet review/confirmation**

ClipTweet information is automatically and routinely collected through Twitter Search in GitHub Actions.  
This information is collected as "candidate" in DB.  
Candidate information is collected in Issue of this repository, and community can comment "whether the tweet is clipTweet or not."  
Bot autonomously detect comment by community, then process the confirmation.

## Developments

Finish 1st generation development.

## Reference

This project is based on [VClab](https://github.com/tarepan/VoiceConversionLab)
