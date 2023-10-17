const db = require("../database");
const cryptojs = require("crypto-js");

async function gettokenwithid(userid) {
  let token = await db.query(
    "SELECT * from tokens WHERE userid=$1",
    [userid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return token.rows;
}

async function gettokenwithvalue(tokenvalue) {
  let token = await db.query(
    "SELECT * from tokens WHERE token=$1",
    [tokenvalue],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return token.rows[0];
}

async function createtoken(userid) {
  const expired_at = new Date();
  expired_at.setDate(new Date().getDate() + 30);
  let random1 = (Math.random() + 1).toString(36).substring(7);
  let random2 = (Math.random() + 1).toString(36).substring(7);
  let tokenvalue = cryptojs.AES.encrypt(random1, random2).toString();
  let token = await db.query(
    "INSERT INTO tokens VALUES($1,$2,$3) RETURNING *",
    [userid, tokenvalue, expired_at],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return token.rows[0];
}

module.exports = {
  gettokenwithid,
  createtoken,
  gettokenwithvalue,
};
