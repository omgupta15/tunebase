#! /usr/bin/env node

// CLI Functions
import cli from "./cli/index.js";

// Utils
import generateLogo from "./utils/generateLogo.js";

const run = async (): Promise<void> => {
  // Clear Screen
  process.stdout.write("\x1b[H\x1b[2J");

  const logo = await generateLogo("tunebase");
  console.log(logo);
  console.log("Search and play music right from your terminal\n");

  const query = await cli.getQuery();
  if (!query) return; // Help Menu shown

  const songs = await cli.searchSongs(query);
  if (songs.length === 0) return;

  const selectedSong = await cli.selectSong(songs);

  const song = await cli.getSongDetails(selectedSong);
  if (
    song === undefined ||
    song.streamUrl === undefined ||
    song.streamUrl === ""
  )
    return;

  await cli.play(song);
};

run()
  .then(() => {})
  .catch((err) => console.log("An Error Occurred:", err));
