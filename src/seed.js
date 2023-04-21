const db = require("./database.js");

const insertUserQuery = `INSERT INTO users (nickname, email, password_salt, password_hash, created_At)
                          VALUES ($1, $2, $3, $4, $5)`;
const instertTokenQuery = `INSERT INTO tokens (token, user_id, created_At)
                          VALUES ($1, $2, $3)`;

const users = [
  {
    nickname: `TESTUSER${Date.now()}+1`,
    email: `abdaajı${Date.now()}@hotmail.com`,
    password_salt: "password1",
    password_hash: "password1",
    created_At: "2021-01-01 00:00:00",
  },
  {
    nickname: `TESTUSER${Date.now()}`,
    email: `abdaajı${Date.now()}1@hotmail.com`,
    password_salt: "password2",
    password_hash: "password2",
    created_At: "2021-01-01 00:00:00",
  },
];

const tokens = [
  {
    userid: 1,
    token: "testtoken",
    created_At: "2021-01-01 00:00:00",
  },
  {
    userid: 2,
    token: "testtoken2",
    created_At: "2021-01-01 00:00:00",
  },
];

users.forEach((user) => {
  const { nickname, email, password_salt, password_hash, created_At } = user;
  db.query(insertUserQuery, [
    nickname,
    email,
    password_salt,
    password_hash,
    created_At,
  ]);
});

tokens.forEach((token) => {
  const { userid, token, created_At } = token;
  db.query(instertTokenQuery, [token, userid, created_At]);
});
