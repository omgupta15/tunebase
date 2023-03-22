import axios from "axios";
import { decode } from "html-entities";

// Interfaces
import { IJioSaavn } from "../types/API/JioSaavn/interfaces.js";

// Types
import { Method } from "axios";
import Song from "../types/song.js";
import {
  SearchSongsParams,
  GetSongDetailsParams,
  RequestParams,
  ResponseObject,
} from "../types/API/JioSaavn/types.js";

// Type Checks
import {
  isGetSongDetailsResponse,
  isSearchSongsResponse,
  isResponseData,
} from "../types/API/JioSaavn/checks.js";

// Utils
import convertStreamUrl from "../utils/convertStreamUrl.js";
import convertSecondsToDurationString from "../utils/convertSecondsToDurationString.js";

class JioSaavn implements IJioSaavn {
  method: Method;
  baseUrl: string;

  constructor() {
    this.method = "GET";
    this.baseUrl = "https://www.jiosaavn.com/api.php";
  }

  async request(params: RequestParams): Promise<ResponseObject> {
    const failResponse: ResponseObject = { success: false };

    const response = await axios({
      method: this.method,
      url: this.baseUrl,
      params,
    })
      .then((res) => {
        const data = res.data;

        let songId: string | undefined = undefined;
        if ("pids" in params && typeof params.pids === "string")
          songId = params.pids;

        if (!isResponseData(data, songId)) return failResponse;
        const response: ResponseObject = { success: true, data };
        return response;
      })
      .catch((err) => {
        console.log("Error:", err);
        return failResponse;
      });

    return response;
  }

  async searchSongs(query: string): Promise<Song[]> {
    const params: SearchSongsParams = {
      __call: "autocomplete.get",
      _format: "json",
      _marker: "0",
      cc: "in",
      includeMetaTags: "1",
      query,
    };

    const response = await this.request(params);
    if (!response.success) return [];

    if (!isSearchSongsResponse(response.data)) return [];

    const songsList = response.data.songs.data;
    for (let index = 0; index < songsList.length; index++) {
      songsList[index] = await this.getSongDetails(songsList[index]);
      songsList[index].title = decode(songsList[index].title);
      songsList[index].album = decode(songsList[index].album);
      songsList[index].description = decode(songsList[index].description);
    }
    return songsList;
  }

  async getSongDetails(song: Song): Promise<Song> {
    const params: GetSongDetailsParams = {
      __call: "song.getDetails",
      cc: "in",
      _marker: "0?_marker=0",
      _format: "json",
      pids: song.id,
    };

    const response = await this.request(params);
    if (!response.success) return song;

    if (!isGetSongDetailsResponse(response.data, song.id)) return song;

    const previewUrl = response.data[song.id].media_preview_url,
      duration = response.data[song.id].duration,
      is320Kbps = response.data[song.id]["320kbps"] === "true",
      year = response.data[song.id].year;

    song.year = year;
    song.durationSeconds = parseInt(duration);
    song.durationString = convertSecondsToDurationString(song.durationSeconds);
    song.streamUrl = convertStreamUrl(previewUrl, is320Kbps);
    return song;
  }
}

export default new JioSaavn();
