const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// @route POST api/users
// @desc Test
// @access Public
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("lastName", "Name is required").notEmpty(),
    body("email", "Include valid email").isEmail(),
    body("password", "password is to short").isLength({ min: 6 }),
    body("password2", "password2 is to short").isLength({ min: 6 }),
  ],
  (req, res) => {
    console.log(req.body);

    //z dokumentacji express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);

module.exports = router;
