import Song from "../../song";

// Params
export type SearchSongsParams = {
  __call: "autocomplete.get";
  _format: "json";
  _marker: "0";
  cc: "in";
  includeMetaTags: "1";
  query: string;
};
export type GetSongStreamUrlParams = {
  __call: "song.getDetails";
  cc: "in";
  _marker: "0?_marker=0";
  _format: "json";
  pids: string;
};

// Requests
export type RequestParams = SearchSongsParams | GetSongStreamUrlParams;

/**********************************************************************************/

// Response Data
export type SearchSongsResponse = { songs: { data: Song[] } };
export type GetSongStreamUrlResponse = {
  [id: string]: { media_preview_url: string; "320kbps": "true" | "false" };
};

// Responses
export type ResponseData = SearchSongsResponse | GetSongStreamUrlParams;
export type ResponseObject =
  | { success: true; data: ResponseData }
  | { success: false };
