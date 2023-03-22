#! /usr/bin/env node

import cli from "./cli/index.js";

const run = async (): Promise<void> => {
  // Clear Screen
  process.stdout.write("\x1b[H\x1b[2J");

  const query = await cli.getQuery();

  const songs = await cli.searchSongs(query);
  if (songs.length === 0) return;

  const selectedSong = await cli.selectSong(songs);

  const song = await cli.getSongDetails(selectedSong);
  if (song === undefined || song.streamUrl === undefined) return;

  await cli.play(song);
};

run()
  .then(() => console.log("Execution complete."))
  .catch((err) => console.log("Error:", err));
