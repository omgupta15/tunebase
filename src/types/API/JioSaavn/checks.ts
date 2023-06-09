import Song from "../../song.js";
import {
  SearchSongsResponse,
  GetSongDetailsResponse,
  ResponseData,
  GenerateStreamUrlResponse,
} from "./types.js";

export const isSong = (data: any): data is Song => {
  if (
    typeof data === "object" &&
    "type" in data &&
    data.type === "song" &&
    "id" in data &&
    typeof data.id === "string" &&
    "title" in data &&
    typeof data.title === "string" &&
    "album" in data &&
    typeof data.album === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "description" in data &&
    typeof data.description === "string"
  )
    return true;
  return false;
};

export const isSearchSongsResponse = (
  response: any
): response is SearchSongsResponse => {
  if (
    typeof response === "object" &&
    "songs" in response &&
    typeof response.songs === "object" &&
    "data" in response.songs &&
    Array.isArray(response.songs.data)
  ) {
    for (let song of response.songs.data) {
      if (!isSong(song)) return false;
    }
    return true;
  }
  return false;
};

export const isGetSongDetailsResponse = (
  response: any,
  songId: string
): response is GetSongDetailsResponse => {
  if (
    typeof response === "object" &&
    songId in response &&
    typeof response[songId] === "object" &&
    "media_preview_url" in response[songId] &&
    typeof response[songId].media_preview_url === "string" &&
    "encrypted_media_url" in response[songId] &&
    typeof response[songId].encrypted_media_url === "string" &&
    "320kbps" in response[songId] &&
    typeof response[songId]["320kbps"] === "string" &&
    (response[songId]["320kbps"] === "true" ||
      response[songId]["320kbps"] === "false") &&
    "year" in response[songId] &&
    typeof response[songId].year === "string"
  )
    return true;

  return false;
};

export const isGenerateStreamUrlResponse = (
  response: any
): response is GenerateStreamUrlResponse => {
  if (
    typeof response === "object" &&
    "status" in response &&
    response.status === "success" &&
    "auth_url" in response &&
    typeof response.auth_url === "string"
  )
    return true;
  return false;
};

export const isResponseData = (
  response: any,
  songId?: string
): response is ResponseData => {
  if (isSearchSongsResponse(response)) return true;
  if (songId !== undefined && isGetSongDetailsResponse(response, songId))
    return true;
  if (isGenerateStreamUrlResponse(response)) return true;
  return false;
};
