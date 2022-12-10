var fs = require("fs");
const db = require("./database");

//add new migration files to array
//add to last index of the array!
var migratefiles = new Array("./migrations/202206231018-createdatabase.sql");
//running sql files

fs.readdirSync("./migrations").map((file) => {
  console.log(file);
  let sql=fs.readFileSync(
    "./migrations/" + file.toString(),
    { encoding: "utf8", flag: "r" },
    function (err, data) {
      if (err) console.log(err);
    }).toString();


      db.query(sql, (err, res) => {
        if (err) {
          console.log("error: ", err);
          process.exit(1);
        }
      });
});
console.log("Database migrated succesfully!");
