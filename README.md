<h1 align="center">
  <img src="https://user-images.githubusercontent.com/36772158/227174869-23b31894-3974-47f3-bea2-6f2cfc37cdf5.png#gh-dark-mode-only" alt="play-music" height="100" />

</h1>
<p align="center">Search and play music right from your terminal</p>
<div align="center">

[![npm version](https://img.shields.io/npm/v/tunebase.svg?style=flat-square)](https://www.npmjs.org/package/tunebase)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/tunebase?style=flat-square)](https://bundlephobia.com/package/tunebase@latest)

<!-- [![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=tunebase&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=tunebase) -->
<!-- [![npm downloads](https://img.shields.io/npm/dm/tunebase.svg?style=flat-square)](https://npm-stat.com/charts.html?package=tunebase) -->

</div>

## Demo

https://user-images.githubusercontent.com/36772158/227199684-c82053fd-2471-4b1f-8a7a-173a60352ad7.mp4

## Features

- 🔍 Search for music
- 🔉 Increase/decrease volume
- ⏯️ Pause/play music
- 🌁 ASCII characters based thumbnail
- ⏩ Seek forwards and backwards
- 🔢 Supports seeking to specific point (0..9) (6 advances to 60% of duration)
- ✅ Works without login/authentication

## Installation

Install `tunebase` with npm:

```bash
npm install -g tunebase
```

<!--  TODO: Add instructions for installing VLC. -->

## Usage

Once installed, you can run any of the following commands on your terminal:
```bash
play
play [search query]
```

You can also use the following aliases:
- `tunebase`
- `play-music`

## Terminal Commands

```
[search query]        Search and play a song right from your terminal
help                  To show this help menu
```

## Player Commands

```
SPACE                 Play/Pause
← (left arrow key)    Seek back by 5 seconds
→ (right arrow key)   Seek forward by 5 seconds
↑ (up arrow key)      Increase Volume
↓ (down arrow key)    Decrease Volume
0..9                  Seek to specific point in the song (6 seeks to 60% of duration)
```

## Flags

```
-h, --help            To show this help menu
```
