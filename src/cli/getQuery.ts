import inquirer from "inquirer";

// Utils
import showHelpMenu from "../utils/showHelpMenu.js";

const getQuery = async (): Promise<string> => {
  let query = process.argv.slice(2).join(" ").trim();

  if (query === "help" || query === "-h" || query === "--help") {
    showHelpMenu();
    return "";
  }

  while (!query) {
    const answer = await inquirer.prompt({
      name: "query",
      type: "input",
      message: "🔍 Search a song:",
    });
    console.log();
    query = answer.query;
  }

  return query;
};

export default getQuery;
