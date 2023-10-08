const mongoose = require("mongoose");
const Exception = require("../Exceptions/Exception.js");
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("connect succeeded");
    return connection;
  } catch (error) {
    const { code } = error;
    if (code === 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code === "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECTION);
  }
}
module.exports = connect;
