const express = require("express");
const connectDB = require('./db')


const app = express();

//Connect to DB
connectDB();

app.get("/", (req, res) => res.send("API Running"));

//Defin Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is working at ${PORT}`));
