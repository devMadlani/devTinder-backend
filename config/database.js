const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://madlanidev:mZBIdEr3IzyHPoux@dev-tinder.bexyjp2.mongodb.net/devTinder?retryWrites=true&w=majority&appName=dev-tinder"
  );
};

module.exports = connectDb;
