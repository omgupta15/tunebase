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
const JioSaavn_1 = __importDefault(require("./API/JioSaavn"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "teri yaad yash naverkar";
    const songs = yield JioSaavn_1.default.searchSongs(query);
    console.log(songs);
    const selectedSong = songs[0];
    const streamUrl = yield JioSaavn_1.default.getSongStreamUrl(selectedSong.id);
    console.log("Stream Url:", streamUrl);
});
run()
    .then(() => console.log("Completed"))
    .catch((err) => console.log("Error:", err));
