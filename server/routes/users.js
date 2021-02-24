const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    // console.log(req.body);

    //z dokumentacji express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, email, password } = req.body;
    try {
      //if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user exists" });
      }

      //tworzeusera
      user = new User({ name, lastName, email, password });
      console.log(user);

      //encrypt password dodaje to niego zakodowane haslo
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log(user);

      //add user do database
      await user.save();

      //return jsonwebtoken
      const jwtSecret = "mysecrettoken";

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({token})
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
