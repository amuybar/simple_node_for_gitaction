const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe("Product APIS  Test", () => {
  it("Should Get Product API", (done) => {
    chai
      .request(app)
      .get("/product/api")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        console.log(res.body)
        done();
      });
  });
  it("Should Post Product API", (done) => {
    chai.request(app)
      .post("/product/api")
      .end((err, res) => {
      res.should.have.status(201);
    })
  });
  it("Should Register User", (done) => {
    chai.request(app)
    .post("/auth/register")
      .send({
      username: "testuser",
      password: "testpass"
      })
     .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("Should Login User", (done) => {
    chai.request(app)
      .send({
      username: "testuser",
      password: "testpass"
      })
      .end((err, res) => {
      res.should.have.status(200);
    })
   });


});
