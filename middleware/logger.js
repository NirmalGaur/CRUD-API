const moment = require("moment"); //3rd party package which deals with date formatting

//Creating a simple Middleware function:
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  ); //logs the URL
  next();
}; //Everytime we make a request from client side, this middleware function would run

module.exports = logger;
