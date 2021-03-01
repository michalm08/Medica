const mongoose = require('mongoose');
const config = require('config');
//tak moge wyciagac sb rzeczy z jsona
const db = config.get('mongoURI')

// zabezpieczenie z funkcja asynchroniczna i tryCatch jest spoko
const connectDB = async () =>{
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message)

        //Exit process with fail
        process.exit(1);
    }
}

module.exports = connectDB;
