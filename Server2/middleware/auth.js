require("dotenv").config();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticated = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("Invalid");
    res.json({
      error: `Authentication invalid: No token was found, please login again`,
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { _id: payload.userID, name: payload.name };
    res.header("Access-Control-Allow-Origin", "*");
    next();
  } catch (error) {
    error = `Unauthenticated, ${StatusCodes.UNAUTHORIZED}`;
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
};

module.exports = authenticated;
