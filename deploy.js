const fse = require("fs-extra");
const fs = require("fs");

fse.copyFileSync("./template.yml", "./serverless.yml");

const name = "name: cfs-server-" + process.argv[process.argv.length - 1];
fs.appendFile("serverless.yml", name + "\n", () => {});
