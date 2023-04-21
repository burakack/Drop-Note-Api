const db = require("database.js")


const insertUserQuery = `INSERT INTO users (name, email, password)
                          VALUES ($1, $2, $3)`;

const users = [
  { name: 'John Doe', email: 'john@example.com', password: 'password1',cpassword:'password1' },
  { name: 'Jane Doe', email: 'jane@example.com', password: 'password2',cpassword:'password2' }
];

users.forEach(user => {
  const { name, email, password } = user;
  db.query(insertUserQuery, [name, email, password]);
});