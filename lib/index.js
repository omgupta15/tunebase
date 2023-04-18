#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// CLI Functions
import cli from "./cli/index.js";
// Utils
import generateLogo from "./utils/generateLogo.js";
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // Clear Screen
    process.stdout.write("\x1b[H\x1b[2J");
    const logo = yield generateLogo("tunebase");
    console.log(logo);
    console.log("Search and play music right from your terminal\n");
    const query = yield cli.getQuery();
    if (!query)
        return; // Help Menu shown
    const songs = yield cli.searchSongs(query);
    if (songs.length === 0)
        return;
    const selectedSong = yield cli.selectSong(songs);
    const song = yield cli.getSongDetails(selectedSong);
    if (song === undefined ||
        song.streamUrl === undefined ||
        song.streamUrl === "")
        return;
    yield cli.play(song);
});
run()
    .then(() => { })
    .catch((err) => console.log("An Error Occurred:", err));
