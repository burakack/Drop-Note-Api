let expect = require("chai").expect;
let request = require("supertest");
const app = require("../../app");

let user = {
  nickname: `TESTUSER${Date.now()}`,
  email: `abdaajı${Date.now()}@hotmail.com`,
  password: "123456",
  cpassword: "123456",
};

describe("POST /profile/register", () => {
  it("201-Successful registration scenario", (done) => {
    request(app)
      .post("/profile/register")
      .send({
        nickname: user.nickname,
        email: user.email,
        password: user.password,
        cpassword: user.cpassword,
      })
      .expect(201, done);
  });

  it("201-Successful second registration scenario", (done) => {
    request(app)
      .post("/profile/register")
      .send({
        nickname: user.nickname + "-2",
        email: `abdaajı${Date.now()}@hotmail.com`,
        password: user.password,
        cpassword: user.cpassword,
      })
      .expect(201, done);
  });

  it("400-Passwords need match", (done) => {
    request(app)
      .post("/profile/register")
      .send({
        nickname: `test ${Date.now()} user`,
        email: `testuser${Date.now()}@hotmail.com`,
        password: "123456",
        cpassword: "1234",
      })
      .expect(400, done);
  });

  it("400-E-mail need to be unique", (done) => {
    request(app)
      .post("/profile/register")
      .send({
        nickname: `test ${Date.now()} user`,
        email: user.email,
        password: user.password,
        cpassword: user.cpassword,
      })
      .expect(400, done);
  });

  it("400-Nickname need to be unique", (done) => {
    request(app)
      .post("/profile/register")
      .send({
        nickname: user.nickname,
        email: `testuser${Date.now()}@hotmail.com`,
        password: user.password,
        cpassword: user.cpassword,
      })
      .expect(400, done);
  });
});

describe("POST /profile/login", () => {
  it("200-Succesful login scenario", (done) => {
    request(app)
      .post("/profile/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .end(function (err, res) {
        user.token = res.body.token.token;
        user.id = res.body.token.userid;
        expect(res.body.token.token).not.equals(null);
        done();
      });
  });
  it("401-Wrong password", (done) => {
    request(app)
      .post("/profile/login")
      .send({
        email: user.email,
        password: "nanelimon",
      })
      .expect(401, done);
  });
  it("401-No users registered with this email", (done) => {
    request(app)
      .post("/profile/login")
      .send({
        email: `abdaajı${Date.now()}@hotmail.com`,
        password: user.password,
      })
      .expect(401, done);
  });
});

describe(`GET /profile/:id`, () => {
  it("200-Successfull getting user info", (done) => {
    request(app).get(`/profile/${user.id}`).send().expect(200, done);
  });
  it("404-User not found", (done) => {
    request(app).get("/profile/1000000000").send().expect(404, done);
  });
});

describe(`GET /profile/:slug/notes`, function () {
  it("200-Successfull getting user notes", function (done) {
    request(app)
      .get(`/profile/${user.nickname}/notes`)
      .send()
      .expect(200, done);
  });
  it("404-No user with this nickname", function (done) {
    request(app).get("/profile/dpopghdfo/notes").send().expect(404, done);
  });
});
exports.user = user;
