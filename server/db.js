const mongoose = require("mongoose");
const db =
  "mongodb+srv://michalm08:lolek1@medica.hqequ.mongodb.net/medicaDB?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      //https://mongoosejs.com/docs/deprecations.html
      //tutaj oimjamy przestarzale niezgodnosci versji mongo i node ktore zostana naprawione w przyszlych wercjach
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongoDb connected");
  } catch (err) {
    console.error(err.message);

    //ta komenda jest czescia node i konczy nam program jako fail (gdyby bylo 0 to konczylo by jako pomyslne zakonczenie)
    process.exit(1);
  }
};

module.exports = connectDB;
