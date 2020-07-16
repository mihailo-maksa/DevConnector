const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if there's no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found - authorization denied." });
  }

  // Verify user & call next()
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      // jwt.verify(token, jwtSecret, callback with (error, decodedToken));
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Something went wrong with the auth.js middleware: ", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
