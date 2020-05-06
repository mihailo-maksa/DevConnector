const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const normalize = require("normalize-url");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Please enter a valid email.").isEmail(),
    check("password", "Password must contain 8 or more chracters.").isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(500)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get the user's gravatar

      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm"
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        password,
        avatar
      });

      // Use bcrypt to hash the password

      const salt = await bcrypt.genSalt(10);
      // bcrypt.genSalt(numberOfSaltingRounds);

      user.password = await bcrypt.hash(password, salt);
      // bcrypt.hash(plainTextPassword, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id // this is the _id from MongoDB
        }
      };

      jwt.sign(
        // jwt.sign(payloadThatContainsId, secretString, optionsObject, callback with (err, token));
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
