const fs = require("fs");
const db = require("./database");

const migrationFiles = fs.readdirSync("./migrations");

Promise.all(
  migrationFiles.map((file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        "./migrations/" + file.toString(),
        { encoding: "utf8", flag: "r" },
        function (err, data) {
          if (err) reject(err);
          db.query(data, (err, res) => {
            if (err) reject(err);
            resolve(res);
          });
        }
      );
    });
  })
)
  .then(() => {
    console.log("Database migrated successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error occurred during migration:", err);
    process.exit(1);
  });
