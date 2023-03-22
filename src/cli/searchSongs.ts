import { createSpinner } from "nanospinner";

// APIs
import JioSaavn from "../API/JioSaavn.js";

// Types
import Song from "../types/song.js";

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

export default searchSongs;
