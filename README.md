<h1 align="center">
  <img src="https://raw.githubusercontent.com/omgupta15/play-music/main/assets/img/logo-dark.png?token=GHSAT0AAAAAABXTH6PCF5HB2NHZIQQKXNI2ZA4ALRQ#gh-dark-mode-only" alt="play-music" height="100" />
  <img src="https://raw.githubusercontent.com/omgupta15/play-music/main/assets/img/logo-light.png?token=GHSAT0AAAAAABXTH6PDQMMNEM7PQKOIJDW4ZA4ANNQ#gh-light-mode-only" alt="play-music" height="100" />
</h1>
<p align="center">Search and play music right from your terminal</p>
<div align="center">

[![npm version](https://img.shields.io/npm/v/play-music.svg?style=flat-square)](https://www.npmjs.org/package/play-music)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=play-music&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=play-music)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/play-music?style=flat-square)](https://bundlephobia.com/package/play-music@latest)
[![npm downloads](https://img.shields.io/npm/dm/play-music.svg?style=flat-square)](https://npm-stat.com/charts.html?package=play-music)

</div>

## Demo

https://user-images.githubusercontent.com/36772158/227133889-98cae53d-051a-4e95-9887-23da2f9b7cc6.mov

## Features

- 🔍 Search for music
- 🔉 Increase/decrease volume
- ⏯️ Pause/play music
- 🌁 ASCII characters based thumbnail
- ⏩ Seek forwards and backwards
- 🔢 Supports seeking to specific point (0..9) (6 advances to 60% of duration)
- ✅ Works without login/authentication

## Installation

Install `play-music` with npm:

```bash
npm install -g play-music
```

<!--  TODO: Add instructions for installing VLC. -->

## Usage

```bash
play
play [search query]
```

You can also use the alias `play-music` instead of `play`.

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
