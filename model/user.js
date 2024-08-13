const mongo=require("mongoose");


const userSchema = new mongo.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongo.model("User", userSchema);

module.exports = User;