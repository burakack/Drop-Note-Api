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
    }
  );
  return token.rows;
}

async function gettokenwithvalue(tokenvalue) {
  token = await db.query(
    "SELECT * from tokens WHERE token=$1",
    [tokenvalue],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return token.rows[0];
}

async function createtoken(userid) {
  const expired_at = new Date();
  expired_at.setDate(new Date().getDate() + 30);
  const random1 = crypto.randomBytes(20)
  const random2 = crypto.randomBytes(20)
  let tokenvalue = cryptojs.AES.encrypt(random1, random2).toString();
  token = await db.query(
    "INSERT INTO tokens VALUES($1,$2,$3) RETURNING *",
    [userid, tokenvalue, expired_at],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return token.rows[0];
}

module.exports = {
  gettokenwithid,
  createtoken,
  gettokenwithvalue,
};
