const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route GET api/auth
// @desc Test
// @access Public
router.get("/", auth, async (req, res) => {
  // res.send('Auth route')
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate User and get token
// @access Public
router.post(
  "/",
  [
    body("email", "Include valid email").isEmail(),
    body("password", "password is required").exists(),
  ],
  async (req, res) => {
    // console.log(req.body);

    //z dokumentacji express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "user not exists" });
      }


      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "wrocng password" });
      }




      //return jsonwebtoken
      const jwtSecret = "mysecrettoken";

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
