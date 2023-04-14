var request = require("supertest");
app = require("../../app");
const tokenservice = require("../services/tokens");

var token = tokenservice.gettokenwithid(1);
token.then(function (result) {
  describe("GET /notes/:slug", () => {
    it("200-Successful getting notes", (done) => {
      request(app)
        .get("/notes/istanbul")
        .set("access_token", result[0].token)
        .send({})
        .expect(200, done);
    });
  });

  describe("POST /notes/:slug", () => {
    it("200-Successful posting notes", (done) => {
      request(app)
        .post("/notes/istanbul")
        .set("access_token", result[0].token)
        .send({
          notetext: "this is a test note",
          isanonymus: false,
        })
        .expect(200, done);
    });
    it("400-Posting notes with no text", (done) => {
      request(app)
        .post("/notes/istanbul")
        .set("access_token", result[0].token)
        .send({
          isanonymus: true,
        })
        .expect(400, done);
    });
    it("400-Posting notes with no anonymus property", (done) => {
      request(app)
        .post("/notes/istanbul")
        .set("access_token", result[0].token)
        .send({
          notetext: "this is a test note",
        })
        .expect(400, done);
    });
  });
  describe("UPDATE /notes/:slug", () => {
    it("200-Successful updating notes", (done) => {
      request(app)
        .put("/notes/istanbul")
        .set("access_token", result[0].token)
        .send({
          notetext: "sad note",
          isanonymus: false,
        })
        .expect(200, done);
    });
  });
  describe("DELETE /notes/:slug", () => {
    it("200-Successful Delete note", (done) => {
      request(app)
        .delete("/notes/1")
        .set("access_token", result[0].token)
        .send({})
        .expect(200, done);
    });
  });
});
