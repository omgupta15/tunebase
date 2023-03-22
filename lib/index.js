#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const nanospinner_1 = require("nanospinner");
const JioSaavn_1 = __importDefault(require("./API/JioSaavn"));
const checks_1 = require("./types/checks");
const getQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = process.argv.slice(2).join(" ").trim();
    while (!query) {
        const answer = yield inquirer_1.default.prompt({
            name: "query",
            type: "input",
            message: "🔍 Search a song: ",
        });
        console.log();
        query = answer.query;
    }
    return query;
});
const searchSongs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = (0, nanospinner_1.createSpinner)(`Searching "${query}"...`).start();
    const songs = yield JioSaavn_1.default.searchSongs(query);
    if (songs.length === 0) {
        spinner.error({ text: `No results found for "${query}"` });
        return [];
    }
    spinner.success({ text: `Found ${songs.length} results for "${query}"` });
    console.log();
    return songs;
});
const getSongDetailsString = (song) => {
    return `${song.title} • ${song.description} • ${song.durationString} • ${song.year}`;
};
const selectSong = (songs) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield inquirer_1.default.prompt({
        name: "songIndex",
        message: "Select a song to play:",
        type: "list",
        choices: songs
            .map(getSongDetailsString)
            .map((text, index) => ({ name: text, value: index })),
    });
    console.log();
    if (!(0, checks_1.isSelectSongAnswerObject)(answer))
        return songs[0];
    return songs[answer.songIndex];
});
const getSongDetails = (song) => __awaiter(void 0, void 0, void 0, function* () {
    if (song.streamUrl !== undefined)
        return song;
    const spinner = (0, nanospinner_1.createSpinner)(`Fetching song details...`).start();
    const songWithDetails = yield JioSaavn_1.default.getSongDetails(song);
    if (songWithDetails.streamUrl === undefined) {
        spinner.error({
            text: `An error occurred while fetching song details! Please check your internet connection and try again.`,
        });
        return;
    }
    spinner.success({ text: `Song details fetched.` });
    console.log();
    return songWithDetails;
});
const play = (song) => __awaiter(void 0, void 0, void 0, function* () { });
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield getQuery();
    const songs = yield searchSongs(query);
    if (songs.length === 0)
        return;
    const selectedSong = yield selectSong(songs);
    const song = yield getSongDetails(selectedSong);
    if (song === undefined || song.streamUrl === undefined)
        return;
    play(song);
});
run()
    .then(() => console.log("Execution complete."))
    .catch((err) => console.log("Error:", err));
