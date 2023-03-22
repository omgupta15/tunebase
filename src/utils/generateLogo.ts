import figlet from "figlet";

const generateLogo = (text): Promise<string> => {
  return new Promise((resolve, reject) => {
    figlet(text, { font: "Slant" }, (err, result) => {
      if (err) reject(err);
      resolve(`${result}\n`);
    });
  });
};

export default generateLogo;
