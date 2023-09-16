var request = require("supertest");
app = require("../../app");
const tokenservice = require("../services/tokens");

var token = tokenservice.gettokenwithid(1);
token.then(function (result) {
  describe("GET /friends/", () => {
    it("200-Successful getting friends", (done) => {
      request(app)
        .get("/friends/")
        .set("access_token", result[0].token)
        .send({})
        .expect(200, done);
    });
  });
  describe("POST /friends/", () => {
    it("200-Successful sending friend request", (done) => {
      request(app)
        .post("/friends/")
        .set("access_token", result[0].token)
        .send({
          requester_id: 2,
        })
        .expect(200, done);
    });
    it("400-Trying send friend request without requester_id", (done) => {
      request(app)
        .post("/friends/")
        .set("access_token", result[0].token)
        .send({})
        .expect(400, done);
    });
  });
  describe("DELETE /friends/", () => {
    it("200-Successful deleting friend", (done) => {
      request(app)
        .delete("/friends/")
        .set("access_token", result[0].token)
        .send({
          requester_id: 2,
        })
        .expect(200, done);
    });
    it("400-Trying delete friend without requester_id", (done) => {
      request(app)
        .delete("/friends/")
        .set("access_token", result[0].token)
        .send({})
        .expect(400, done);
    });
  });
});
