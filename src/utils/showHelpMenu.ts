import chalk from "chalk";

const showHelpMenu = () => {
  const HELP_MENU_TEXT = `Usage:
  play
  play [search query]

Alias:
  play-music
  tunebase

Available Commands:
  [search query]        Search and play a song right from your terminal
  help                  To show this help menu

Player Commands:
  SPACE                 Play/Pause
  ← (left arrow key)    Seek back by 5 seconds
  → (right arrow key)   Seek forward by 5 seconds
  ↑ (up arrow key)      Increase Volume
  ↓ (down arrow key)    Decrease Volume
  0..9                  Seek to specific point in the song (6 seeks to 60% of duration)

Flags:
  -h, --help            To show this help menu
`;

  console.log(HELP_MENU_TEXT);
};

export default showHelpMenu;
