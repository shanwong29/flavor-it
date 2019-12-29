const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Cloudinary
const uploadCloud = require("../config/cloudinary");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single("imagePath"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const defaultUserImage =
    "https://res.cloudinary.com/jeffmoraes/image/upload/v1574348835/images/unknown-user.jpg.jpg";
  let imagePath = req.file ? req.file.url : defaultUserImage;

  if (username === "" || password === "") {
    res.render("auth/signup", {
      message: "please indicate username and password"
    });
    return;
  }

  let regex = /^[a-z0-9]+$/i;
  let isValidUserName = regex.test(username);
  console.log(username, isValidUserName);
  if (!isValidUserName) {
    res.render("auth/signup", {
      message: "Username can only include english letters or numbers",
      usernameInput: username
    });
    return;
  }

  if (username.length < 3 || username.length > 15) {
    res.render("auth/signup", {
      message: "Username can only has 3 - 15 characters",
      usernameInput: username
    });
    return;
  }

  if (password.length < 6) {
    res.render("auth/signup", {
      message: "Password has at least 6 characters",
      usernameInput: username
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The username already exists",
        usernameInput: username
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      photo: imagePath
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/auth/login");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
