const process = require("process");
const moment = require("moment");
const fs = require("fs").promises;
const path = require("path");
const random = require("random");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function mekeComit(date) {
  await exec(`sh commit.sh ${date} ${date}`, { shell: true });
  return Promise.resolve(true);
}

const commitLoop = async (fromWeek, statDate, array) => {
  for (let data of array) {
    const week = random.int(fromWeek, 51);
    const day = random.int(0, 6);
    const date = moment(statDate).add(week, "w").add(day, "d").format();
    console.log(date);
    await fs.writeFile(path.join(__dirname, "write.txt"), date);
    await mekeComit(date);
  }

  return Promise.resolve(true);
};

const acceptedTypes = ["months", "weeks", "years", "days"];
const calculateDate = async (
  substractNum,
  substractType,
  commitNum,
  fromDate = new Date()
) => {
  const conditions = [
    substractNum > 1 && substractNum < 1 && substractType === "years",
    substractNum > 12 && substractNum === "months",
    substractNum > 52 && substractNum === "weeks",
    substractNum > 365 && substractNum === "days",
    !acceptedTypes.includes(substractType),
  ];

  if (conditions.includes(true)) {
    throw Error("Invalid Input!");
  }

  const ultimatePrevDate = moment(fromDate).subtract(1, "years");
  const dateFromStart = moment(fromDate).subtract(substractNum, substractType);

  const differnt = moment(dateFromStart).diff(moment(ultimatePrevDate), "days");

  const actualStartingWeek = Math.ceil(differnt / 7);

  const newArrFromNum = Array(commitNum).fill(1);

  const result = await commitLoop(
    actualStartingWeek,
    dateFromStart,
    newArrFromNum
  );
  return Promise.resolve(result);
};
const directory = process.cwd();

calculateDate(4, "months", 10)
  .then((isSuccess) => {
    console.log(isSuccess);
    if (isSuccess) {
      return exec(`sh push.sh a`, { shell: true });
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

process.on("uncaughtException", (error) => {
  console.log("uncaughtException error: ", error.message);
  console.log("uncaughtException stack: ", error.stack);
  process.exit(1);
});
