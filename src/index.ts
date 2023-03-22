#! /usr/bin/env node

import cli from "./cli";

const run = async (): Promise<void> => {
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
