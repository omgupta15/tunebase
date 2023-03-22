import { AnswerObject } from "./types";

export const isSelectSongAnswerObject = (
  answer: any
): answer is AnswerObject => {
  if (
    typeof answer === "object" &&
    "songIndex" in answer &&
    typeof answer.songIndex === "number"
  )
    return true;
  return false;
};
