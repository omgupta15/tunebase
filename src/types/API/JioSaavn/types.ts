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
export type GenerateStreamUrlParams = {
  __call: "song.generateAuthToken";
  url: string;
  bitrate: 320;
  api_version: 4;
  _format: "json";
  _marker: "0";
};

// Requests
export type RequestParams =
  | SearchSongsParams
  | GetSongDetailsParams
  | GenerateStreamUrlParams;

/**********************************************************************************/

// Response Data
export type SearchSongsResponse = { songs: { data: Song[] } };
export type GetSongDetailsResponse = {
  [id: string]: {
    encrypted_media_url: string;
    media_preview_url: string;
    duration: string;
    "320kbps": "true" | "false";
    year: string;
  };
};
export type GenerateStreamUrlResponse = {
  auth_url: string;
  status: "success";
};

// Responses
export type ResponseData =
  | SearchSongsResponse
  | GetSongDetailsResponse
  | GenerateStreamUrlResponse;
export type ResponseObject =
  | { success: true; data: ResponseData }
  | { success: false };
