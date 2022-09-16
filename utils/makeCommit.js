const fs = require("fs");
const path = require("path");

const makeCommit = () => {
  //   fs.writeFile(
  //     path.join(__dirname, "write.txt"),
  //     "nt to put on file",
  //     (err) => {
  //       if (err) throw Error(err);
  //       console.log("write complete");
  //     }
  //   );
  // console.log(this);
  console.log(process.cwd());
};

module.exports = makeCommit;
