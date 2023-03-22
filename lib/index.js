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
import cli from "./cli/index.js";
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log();
    const query = yield cli.getQuery();
    const songs = yield cli.searchSongs(query);
    if (songs.length === 0)
        return;
    const selectedSong = yield cli.selectSong(songs);
    const song = yield cli.getSongDetails(selectedSong);
    if (song === undefined || song.streamUrl === undefined)
        return;
    yield cli.play(song);
});
run()
    .then(() => console.log("Execution complete."))
    .catch((err) => console.log("Error:", err));
