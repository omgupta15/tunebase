const convertSecondsToDurationString = (seconds: number): string => {
  if (seconds < 0) return "0:00";

  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const hoursString = hours.toString().padStart(2, "0");

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  let minutesString = minutes.toString().padStart(2, "0");
  if (hours === 0) minutesString = minutes.toString().padStart(1, "0");

  const secondsString = seconds.toString().padStart(2, "0");

  let durationString = "";
  if (hours > 0) durationString += hoursString + ":";
  durationString += minutesString + ":";
  durationString += secondsString;

  return durationString;
};

export default convertSecondsToDurationString;
