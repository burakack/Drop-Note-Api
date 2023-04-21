const db = require("./database.js");

const insertUserQuery = `INSERT INTO users (nickname, email, password_salt, password_hash, created_At)
                          VALUES ($1, $2, $3, $4, $5)`;

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
