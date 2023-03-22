#! /usr/bin/env node

// CLI Functions
import cli from "./cli/index.js";

// Utils
import generateLogo from "./utils/generateLogo.js";

const run = async (): Promise<void> => {
  // Clear Screen
  process.stdout.write("\x1b[H\x1b[2J");

  const logo = await generateLogo("play-music");
  console.log(logo);

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
