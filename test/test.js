const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const Product = require("../model/product");
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

before((done) => {
  Product.deleteMany({}, function (err) { });
  done();
});
after((done) => {
  Product.deleteMany({}, function (err) {});
  done();
});
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
 
});
