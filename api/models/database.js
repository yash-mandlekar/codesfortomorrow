const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

exports.databaseconnection = async () => {
  try {
    mongoose.connect("mongodb://localhost/codesfortomorrow");
    console.log("database connected!");
  } catch (error) {
    console.log(error.message);
  }
};
