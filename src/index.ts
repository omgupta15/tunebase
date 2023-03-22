#! /usr/bin/env node

import inquirer from "inquirer";
import JioSaavn from "./API/JioSaavn";

const run = async () => {
  const query = "teri yaad yash naverkar";

  const songs = await JioSaavn.searchSongs(query);
  console.log(songs);

  const selectedSong = songs[0];
  const streamUrl = await JioSaavn.getSongStreamUrl(selectedSong.id);
  console.log("Stream Url:", streamUrl);
};

run()
  .then(() => console.log("Completed"))
  .catch((err) => console.log("Error:", err));
