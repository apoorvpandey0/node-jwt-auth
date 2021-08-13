const jwt = require("jsonwebtoken");

const config = process.env;

// I dont understand the "next" parameter here
const verifyToken = (req, res, next) => {

//   Checking for token in body, query and headers
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

// No token passed case
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

//   Token verification step
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;