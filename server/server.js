const express = require("express");
const connectDB = require('./db')


const app = express();

connectDB();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is working at ${PORT}`));
