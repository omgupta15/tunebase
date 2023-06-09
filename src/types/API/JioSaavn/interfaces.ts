import { Method } from "axios";
import Song from "../../song.js";
import { RequestParams, ResponseObject } from "./types.js";

interface IJioSaavn {
  method: Method;
  baseUrl: string;

  request(params: RequestParams): Promise<ResponseObject>;

  searchSongs(query: string): Promise<Song[]>;
  getSongDetails(song: Song, fetchStreamUrl: boolean): Promise<Song>;
  generateStreamUrl(encryptedMediaUrl: string): Promise<string>;
}

export { IJioSaavn };
