const express = require("express");
const router = express.router();

// @route GET api/auth
// @desc Test
// @access Public
router.get('/', (req,res)=>res.send('User route'))

module.exports= router