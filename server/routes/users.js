const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User.js");

// @route POST api/users
// @desc Register User
// @access Public
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("lastName", "Name is required").notEmpty(),
    body("email", "Include valid email").isEmail(),
    body("password", "password is to short").isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);

    //z dokumentacji express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, email, password } = req.body;
    try {
      // if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user exists" });
      }
      
      //encrypt password

      
      //add user do database
      user = new User({ name, lastName, email, password });
      console.log(user);
      await user.save();

      //retunr jsonWebToken
    } catch (error) {}

    res.send("User route");
  }
);

module.exports = router;
