import { createSpinner } from "nanospinner";

// API
import JioSaavn from "../API/JioSaavn.js";

// Types
import Song from "../types/song.js";

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

export default getSongDetails;
