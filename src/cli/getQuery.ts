import inquirer from "inquirer";

const getQuery = async (): Promise<string> => {
  let query = process.argv.slice(2).join(" ").trim();

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
