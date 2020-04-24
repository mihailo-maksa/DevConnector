const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Define the token
  const token = req.header("x-auth-token");

  // Handle the case inwhich token doesn't exist
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found - authorization denied." });
  }

  // Decode user & call next()
  try {
    jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      // jwt.verify(token, jwtSecret, callback with (error, decodedToken));
      if (error) {
        return res.status(401).json({ msg: "Token is not valid." });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error(
      "Something went wrong with the auth.js middleware: ",
      err.message
    );
    res.status(500).json({ msg: "Internal Server Error." });
  }
};
