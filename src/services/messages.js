const db = require("../database");

async function createmessages(userid, to, message) {
  let date = await db.query("SELECT NOW()");
  let messag = await db.query(
    "INSERT INTO messages (fromuser,touser,messages,created_at) VALUES ($1,$2,$3,$4) RETURNING *;",
    [userid, to, message, date.rows[0].now],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return messag.rows[0];
}

async function getusermessages(userid) {
  let messag = await db.query(
    "SELECT * FROM messages WHERE fromuser=$1 OR touser=$1",
    [userid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return messag.rows;
}

async function getmessages(userid, anotheruserid) {
  let messag = await db.query(
    "SELECT * FROM messages WHERE fromuser=$1 AND touser=$2 OR touser=$1 AND fromuser=$2",
    [userid, anotheruserid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return messag.rows;
}

async function updatemessages(userid, id, message) {
  let date = await db.query("SELECT NOW()");
  let messag = await db.query(
    "UPDATE messages SET messages=$1,updated_at=$2 WHERE id=$3 AND fromuser=$4  RETURNING *;",
    [message, date.rows[0].now, id, userid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return messag.rows[0];
}

async function deletemessages(userid, id) {
  let date = await db.query("SELECT NOW()");
  let messag = await db.query(
    "UPDATE messages SET deleted_at=$2 WHERE id=$1 AND fromuser=$3 RETURNING *;",
    [id, date.rows[0].now, userid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    },
  );
  return messag.rows[0];
}

module.exports = {
  getusermessages,
  createmessages,
  getmessages,
  deletemessages,
  updatemessages,
};
