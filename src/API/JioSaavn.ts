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
  GenerateStreamUrlParams,
  RequestParams,
  ResponseObject,
} from "../types/API/JioSaavn/types.js";

// Type Checks
import {
  isGetSongDetailsResponse,
  isSearchSongsResponse,
  isGenerateStreamUrlResponse,
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
      songsList[index] = await this.getSongDetails(songsList[index], false);
      songsList[index].title = decode(songsList[index].title);
      songsList[index].album = decode(songsList[index].album);
      songsList[index].description = decode(songsList[index].description);
    }
    return songsList;
  }

  async getSongDetails(song: Song, fetchStreamUrl: boolean): Promise<Song> {
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

    const songData = response.data[song.id];
    const previewUrl = songData.media_preview_url,
      duration = songData.duration,
      is320Kbps = songData["320kbps"] === "true",
      year = songData.year,
      encryptedMediaUrl = songData.encrypted_media_url;

    song.year = year;
    song.durationSeconds = parseInt(duration);
    song.durationString = convertSecondsToDurationString(song.durationSeconds);
    if (fetchStreamUrl)
      song.streamUrl = await this.generateStreamUrl(encryptedMediaUrl);
    // convertStreamUrl(previewUrl, is320Kbps);
    else song.streamUrl = undefined;
    return song;
  }

  async generateStreamUrl(encryptedMediaUrl: string): Promise<string> {
    const params: GenerateStreamUrlParams = {
      __call: "song.generateAuthToken",
      url: encryptedMediaUrl,
      bitrate: 320,
      api_version: 4,
      _format: "json",
      _marker: "0",
    };

    const response = await this.request(params);
    if (!response.success) return "";

    if (!isGenerateStreamUrlResponse(response.data)) return "";

    const streamUrl = response.data.auth_url;
    return streamUrl;
  }
}

export default new JioSaavn();
