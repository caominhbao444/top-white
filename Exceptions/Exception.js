class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECTION = "Couldn't connect to Mongoose";
  static USER_ALREADY = "User already exists";
  static CANNOT_REGISTER_USER = "Please check information about this user";
  constructor(message) {
    super(message);
  }
}
module.exports = Exception;
