import Audic from "audic";
import chalk from "chalk";
import readline from "readline";
import asciifyImage from "asciify-image";

// Types
import Song from "../types/song.js";
import { PlayerStatus } from "../types/types.js";

// Utils
import convertSecondsToDurationString from "../utils/convertSecondsToDurationString.js";

const ARROW_SEEK_SECONDS = 5;
const SLIDER_LENGTH = 50;
const VOLUME_BARS_LENGTH = 15;
const FPS = 5;

const getAsciifiedImage = async (song: Song): Promise<string> => {
  const image = await asciifyImage(song.image, {
    fit: "box",
    width: 25,
    height: 25,
  });
  if (Array.isArray(image)) return image.join("\n");
  return image;
};

const getStatusString = (status: PlayerStatus) => {
  const statusLine = status.charAt(0).toUpperCase() + status.slice(1);

  let emoji = "▶️ ",
    color = chalk.bgGreen;
  if (status === "paused") {
    color = chalk.bgYellow;
    emoji = "⏸️ ";
  } else if (status === "stopped") {
    color = chalk.bgRed;
    emoji = "⏹️ ";
  }
  return color(` ${emoji} ${statusLine} `);
};

const renderPlayerUI = (
  song: Song,
  player: Audic,
  status: PlayerStatus,
  thumbnail: string
) => {
  const currentTime = player.currentTime,
    duration = player.duration;
  const currentTimeString = convertSecondsToDurationString(currentTime),
    durationString = convertSecondsToDurationString(duration);

  const slider = new Array(SLIDER_LENGTH).fill(chalk.white("-"));
  let percentage = Math.round((currentTime / duration) * SLIDER_LENGTH);
  if (percentage < 1) percentage = 1;
  for (let index = 0; index < percentage; index++)
    slider[index] = chalk.greenBright("▬");
  slider[percentage - 1] = chalk.greenBright("⬤"); // "🔘"

  const sliderString = slider.join("");

  const volumePercentage = Math.round(player.volume * 100);
  const volumeBarsCount = Math.round(player.volume * VOLUME_BARS_LENGTH);
  let volumeString =
    "🔊 " + "█".repeat(volumeBarsCount) + ` ${volumePercentage}%`;
  if (volumePercentage === 0) volumeString = `🔇 ${chalk.redBright("0%")}`;

  // resets the cursor & clear the screen
  process.stdout.write("\x1b[H\x1b[2J");

  console.log(`
${thumbnail}

${chalk.blueBright("Title:")} ${chalk.green(song.title)} ${chalk.gray(
    `(${song.description})`
  )}

${chalk.blueBright("Album:")} ${chalk.green(song.album)}
${chalk.blueBright("Year:")} ${chalk.green(song.year)}

🎵 ${chalk.blueBright("Status:")} ${getStatusString(status)}

${currentTimeString} ${sliderString} ${durationString}

${volumeString}
`);
};

const increaseVolume = (player: Audic): void => {
  const currentVolume = player.volume;
  const increasedVolume = Math.min(currentVolume + 1 / VOLUME_BARS_LENGTH, 1);
  player.volume = increasedVolume;
};

const decreaseVolume = (player: Audic): void => {
  const currentVolume = player.volume;
  const decreasedVolume = Math.max(currentVolume - 1 / VOLUME_BARS_LENGTH, 0);
  player.volume = decreasedVolume;
};

const seekForward = (player: Audic, seconds: number): void => {
  const currentTime = player.currentTime;
  const newTime = Math.min(currentTime + seconds, player.duration);
  player.currentTime = newTime;
};

const seekBackward = (player: Audic, seconds: number): void => {
  const currentTime = player.currentTime;
  const newTime = Math.max(currentTime - seconds, 0);
  player.currentTime = newTime;
};

const seekPlayer = (player: Audic, key: number): void => {
  const duration = player.duration;

  let newTime = Math.round((duration * key) / 10);
  newTime = Math.min(newTime, duration);
  newTime = Math.max(newTime, 0);
  player.currentTime = newTime;
};

const togglePlayPause = (player: Audic): void => {
  if (player.playing) player.pause();
  else player.play();
};

const play = async (song: Song): Promise<void> => {
  if (song.streamUrl === undefined) throw new Error("Invalid stream url.");

  readline.emitKeypressEvents(process.stdin);

  let intervalId: NodeJS.Timer | undefined;

  process.stdin.on("keypress", (ch, key) => {
    if (key && key.ctrl && key.name === "c") {
      renderPlayerUI(song, player, "stopped", thumbnail);
      console.log(chalk.redBright("Player closed."));
      if (intervalId !== undefined) clearInterval(intervalId);
      process.exit(0);
    } else if (key && !key.ctrl && !key.meta && !key.shift) {
      if (key.name === "up") increaseVolume(player);
      else if (key.name === "down") decreaseVolume(player);
      else if (key.name === "left") seekBackward(player, ARROW_SEEK_SECONDS);
      else if (key.name === "right") seekForward(player, ARROW_SEEK_SECONDS);
      else if (key.name === "space") togglePlayPause(player);
      else if (!isNaN(key.name)) seekPlayer(player, parseInt(key.name));
    }
  });

  process.stdin?.setRawMode?.(true);
  process.stdin.resume();

  const player = new Audic(song.streamUrl);

  // @ts-ignore
  player.addEventListener("playing", () => {});

  // @ts-ignore
  player.addEventListener("ended", () => {
    if (intervalId !== undefined) clearInterval(intervalId);
    renderPlayerUI(song, player, "stopped", thumbnail);
    process.exit(0);
  });

  const thumbnail = await getAsciifiedImage(song);

  await player.play();

  intervalId = setInterval(() => {
    const status: PlayerStatus = player.playing ? "playing" : "paused";
    renderPlayerUI(song, player, status, thumbnail);
  }, Math.round(1000 / FPS));
};

export default play;
