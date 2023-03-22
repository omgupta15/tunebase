#! /usr/bin/env node

import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import Audic from "audic";

import JioSaavn from "./API/JioSaavn";

import Song from "./types/song";
import { isSelectSongAnswerObject } from "./types/checks";

const getQuery = async (): Promise<string> => {
  let query = process.argv.slice(2).join(" ").trim();

  while (!query) {
    const answer = await inquirer.prompt({
      name: "query",
      type: "input",
      message: "🔍 Search a song: ",
    });
    console.log();
    query = answer.query;
  }

  return query;
};

const searchSongs = async (query: string): Promise<Song[]> => {
  const spinner = createSpinner(`Searching "${query}"...`).start();

  const songs = await JioSaavn.searchSongs(query);
  if (songs.length === 0) {
    spinner.error({ text: `No results found for "${query}"` });
    return [];
  }

  spinner.success({ text: `Found ${songs.length} results for "${query}"` });
  console.log();
  return songs;
};

const getSongDetailsString = (song: Song): string => {
  return `${song.title} • ${song.description} • ${song.durationString} • ${song.year}`;
};

const selectSong = async (songs: Song[]): Promise<Song> => {
  const answer = await inquirer.prompt({
    name: "songIndex",
    message: "Select a song to play:",
    type: "list",
    choices: songs
      .map(getSongDetailsString)
      .map((text, index) => ({ name: text, value: index })),
  });
  console.log();
  if (!isSelectSongAnswerObject(answer)) return songs[0];
  return songs[answer.songIndex];
};

const getSongDetails = async (song: Song): Promise<Song | undefined> => {
  if (song.streamUrl !== undefined) return song;

  const spinner = createSpinner(`Fetching song details...`).start();

  const songWithDetails = await JioSaavn.getSongDetails(song);
  if (songWithDetails.streamUrl === undefined) {
    spinner.error({
      text: `An error occurred while fetching song details! Please check your internet connection and try again.`,
    });
    return;
  }

  spinner.success({ text: `Song details fetched.` });
  console.log();
  return songWithDetails;
};

const play = async (song: Song): Promise<void> => {};

const run = async (): Promise<void> => {
  const query = await getQuery();

  const songs = await searchSongs(query);
  if (songs.length === 0) return;

  const selectedSong = await selectSong(songs);

  const song = await getSongDetails(selectedSong);
  if (song === undefined || song.streamUrl === undefined) return;

  play(song);
};

run()
  .then(() => console.log("Execution complete."))
  .catch((err) => console.log("Error:", err));
