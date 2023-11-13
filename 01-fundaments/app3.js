const fs = require("node:fs");

const content = fs.readFileSync("README.md", "utf-8");
const words = content.split(" ");
const reactWordCount = content.match(/React/ig).length;

console.log("Words count: ", words.length);
console.log("React count: ", reactWordCount);