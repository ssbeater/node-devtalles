const fs = require("node:fs");

const data = fs.readFileSync("README.md", "utf-8");
const newContent = data.replace(/React/ig, "Angular");

fs.writeFileSync("readme-angular.md", newContent);