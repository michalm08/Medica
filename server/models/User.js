const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema)
module.exports = User;