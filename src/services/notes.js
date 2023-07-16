const db = require("../database");
const userservice = require("../services/users");

async function createnote(userid, title, notetext, isanonymus) {
  var date = await db.query("SELECT NOW()");
  var note = await db.query(
    "INSERT INTO notes (userid,title,notetext,is_anonymus,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
    [userid, title, notetext, isanonymus, date.rows[0].now],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows[0];
}

async function updatenote(id, noteId, notetext, isanonymus) {
  var date = await db.query("SELECT NOW()");
  var note = await db.query(
    "UPDATE notes SET notetext=$3,is_anonymus=$4,updated_at=$5 WHERE userid=$1 AND id=$2 RETURNING * ;",
    [id, noteId, notetext, isanonymus, date.rows[0].now],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows[0];
}
async function deletenote(noteid, userid) {
  var date = await db.query("SELECT NOW()");
  var note = await db.query(
    "UPDATE notes SET deleted_at=$3 WHERE  id=$2 AND userid=$1 RETURNING * ;",
    [userid, noteid, date.rows[0].now],
    (err, res) => {
      if (err) {
        return err;
      }
    }
  );
  return note.rows[0];
}
async function getnotebytitle(title) {
  var note = await db.query(
    "SELECT notes.id,userid, nickname,title,notetext,is_anonymus,likecount,dislikecount,notes.created_at,notes.updated_at,notes.deleted_at FROM notes INNER JOIN users ON notes.userid=users.id WHERE title=$1",
    [title],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows;
}
async function getnotebyuserid(userid) {
  var date = await db.query("SELECT NOW()");
  var note = await db.query(
    "SELECT * FROM notes WHERE userid=$1",
    [userid],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows;
}
async function likenote(userid, id) {
  var note = await db.query(
    "UPDATE notes SET likecount=array_append(likecount,$1) WHERE id=$2",
    [userid, id],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows;
}
async function dislikenote(userid, id) {
  var note = await db.query(
    "UPDATE notes SET dislikecount=array_append(likecount,$1) WHERE id=$2",
    [userid, id],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return note.rows;
}

async function getnotebynickname(nickname) {
  user = await userservice.getuserwithnickname(nickname);
  if (user.message != "User not found nickname") {
    var note = await db.query(
      `
        SELECT notes.id,title,notetext,likecount,dislikecount,is_anonymus,notes.created_at,notes.updated_at,notes.deleted_at
        FROM users
        INNER JOIN notes
        ON users.id = notes.userid WHERE nickname=$1;
        `,
      [nickname],
      (err, res) => {
        if (err) {
          console.log(err);
        }
      }
    );
    return note.rows;
  }
  return { message: "User not found nickname" };
}

module.exports = {
  createnote,
  updatenote,
  deletenote,
  getnotebytitle,
  getnotebyuserid,
  getnotebynickname,
  likenote,
};
