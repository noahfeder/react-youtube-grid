### react-youtube-grid

A fully responsive grid implementation of YouTube iFrame embeds

This project began as a fork of [this repo](https://github.com/troybetz/react-youtube) and turned into something else entirely.

## Installation

```npm install --save react-youtube-grid```

## Usage
```javascript
<YouTubeGrid youtubeUrls={[array_of_youtube_ids]} />
```
## Props

```
* youtubeUrls (required), array of strings: an array of length > 0 of the YouTube IDs of the videos to embed
* mobile (optional), integer: the integer value of the max-width breakpoint, in pixels,  for your mobile viewport (defaults to 601)
* tablet (optional), integer: the integer value of the max-width breakpoint, in pixels,  for your tablet viewport (defaults to 992)
```
