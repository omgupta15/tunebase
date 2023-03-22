import Song from "../../song.js";

// Params
export type SearchSongsParams = {
  __call: "autocomplete.get";
  _format: "json";
  _marker: "0";
  cc: "in";
  includeMetaTags: "1";
  query: string;
};
export type GetSongDetailsParams = {
  __call: "song.getDetails";
  cc: "in";
  _marker: "0?_marker=0";
  _format: "json";
  pids: string;
};

// Requests
export type RequestParams = SearchSongsParams | GetSongDetailsParams;

/**********************************************************************************/

// Response Data
export type SearchSongsResponse = { songs: { data: Song[] } };
export type GetSongDetailsResponse = {
  [id: string]: {
    media_preview_url: string;
    duration: string;
    "320kbps": "true" | "false";
    year: string;
  };
};

// Responses
export type ResponseData = SearchSongsResponse | GetSongDetailsParams;
export type ResponseObject =
  | { success: true; data: ResponseData }
  | { success: false };
