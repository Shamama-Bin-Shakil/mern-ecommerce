const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  birth_date: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
  },
});
const Auth = mongoose.model("auth", Schema);
module.exports = Auth;
