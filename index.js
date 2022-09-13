const process = require("process");
const { exec } = require("child_process");
const moment = require("moment");
const makeCommit = require("./utils/makeCommit.js");

// makeCommit();
const DATE = moment().subtract(3, "d").format();

exec(
  `sh commit.sh d/utils/github-graph message a ${DATE}`,
  { shell: true },
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log("gello");
  }
);

process.on("uncaughtException", (error) => {
  console.log(error, "err");
});
