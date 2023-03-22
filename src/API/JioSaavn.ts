import axios, { Method } from "axios";

import Song from "../types/song";
import { IJioSaavn } from "../types/API/JioSaavn/interfaces";
import {
  isGetSongStreamUrlResponse,
  isResponseData,
  isSearchSongsResponse,
} from "../types/API/JioSaavn/checks";
import {
  SearchSongsParams,
  GetSongStreamUrlParams,
  GetSongStreamUrlResponse,
  RequestParams,
  ResponseObject,
} from "../types/API/JioSaavn/types";
import convertStreamUrl from "../utils/convertStreamUrl";

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
    return response.data.songs.data;
  }

  async getSongStreamUrl(songId: string): Promise<string> {
    const params: GetSongStreamUrlParams = {
      __call: "song.getDetails",
      cc: "in",
      _marker: "0?_marker=0",
      _format: "json",
      pids: songId,
    };

    const response = await this.request(params);
    if (!response.success) return "";

    if (!isGetSongStreamUrlResponse(response.data, songId)) return "";

    const previewUrl = response.data[songId].media_preview_url,
      is320Kbps = response.data[songId]["320kbps"] === "true";

    const streamUrl = convertStreamUrl(previewUrl, is320Kbps);
    return streamUrl;
  }
}

export default new JioSaavn();
