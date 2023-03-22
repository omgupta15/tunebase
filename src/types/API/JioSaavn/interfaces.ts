import { Method } from "axios";
import Song from "../../song";
import { RequestParams, ResponseObject } from "./types";

interface IJioSaavn {
  method: Method;
  baseUrl: string;

  request(params: RequestParams): Promise<ResponseObject>;
  searchSongs(query: string): Promise<Song[]>;
  getSongDetails(song: Song): Promise<Song>;
}

export { IJioSaavn };
