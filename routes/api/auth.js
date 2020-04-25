const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Let the user see his account's data (i.e. Get user by token)
// @access  Protected
router.get("/", auth, async (req, res) => {
  // Get the user's data & send it in the JSON format

  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get the JWT token (i.e. log in the user)
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required.").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials." }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // bcrypt.compare(plainTextPassword, hashedPassword); => returns true or false

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials." }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        // jwt.sign(payloadThatContainsId, secretString, optionsObject, callback with (err, token));
        payload,
        config.get("jwtSecret"), // Make sure to change it back
        { expiresIn: 360000 }, // to { expiresIn: 3600 } before deploying the app!!
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).end("Internal Server Error");
    }
  }
);

module.exports = router;
