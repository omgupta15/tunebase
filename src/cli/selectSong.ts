import inquirer from "inquirer";

// Types
import Song from "../types/song";

// Type Checks
import { isSelectSongAnswerObject } from "../types/checks";

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

export default selectSong;
