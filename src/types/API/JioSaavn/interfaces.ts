import { Method } from "axios";
import { RequestParams } from "./types";

interface IJioSaavn {
  method: Method;
  baseUrl: string;

  request: (params: RequestParams) => {};

  searchSongs: (query: string) => {};
  getSongStreamUrl: (songId: string) => {};
}

export { IJioSaavn };
