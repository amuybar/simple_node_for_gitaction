const mongo = require("mongoose");

const product = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Product = mongo.model("Product", product);

module.exports = Product;