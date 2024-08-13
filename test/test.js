const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const Product = require("../model/product");
const User = require("../model/user"); // Assuming you have a User model

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

// Clean up the product and user collections before each test suite runs
before(async () => {
   
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
  } catch (err) {
    console.error("Error during setup:", err);
  }
});

// Clean up the product and user collections after the test suite runs
after(async () => {
   
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
  } catch (err) {
    console.error("Error during teardown:", err);
  }
});

describe("User Authentication and Product API Tests", () => {
  
  let token = ""; 

  // Test user registration
  it("Should register a new user", (done) => {
    chai
      .request(app)
      .post("/auth/register")
      .send({
        username: "testuser",
        password: "testpassword",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User registered successfully");
        done();
      });
  });

  // Test user login
  it("Should log in the user and return a token", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({
        username: "testuser",
        password: "testpassword",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        token = res.body.token; // Save the token for subsequent requests
        done();
      });
  });

  // Test adding a product
  it("Should add a new product", (done) => {
    chai
      .request(app)
      .post("/product/api")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        price: 100,
        quantity: 10,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Test Product");
        res.body.should.have.property("price").eql(100);
        res.body.should.have.property("quantity").eql(10);
        done();
      });
  });

  // Test fetching products
  it("Should return the product that was just added", (done) => {
    chai
      .request(app)
      .get("/product/api")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property("name").eql("Test Product");
        res.body[0].should.have.property("price").eql(100);
        res.body[0].should.have.property("quantity").eql(10);
        done();
      });
  });

  // Test fetching products when the database is empty

});
