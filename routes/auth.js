const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth");
const passport = require("passport");

router.post("/signup", signup);

router.post(
  "/login",
  login
  // passport.authenticate("local", { session: false }), // Disable session if not using it
  // (req, res) => {
  //   // If the user was authenticated successfully, passport will have added the user to req.user
  //   if (req.user) {
  //     return res.status(200).json({
  //       message: "Login successful",
  //       user: req.user,
  //     });
  //   } else {
  //     return res.status(400).json({ message: "Invalid credentials" });
  //   }
  // }
);

router.post("/logout", logout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "login",
  }),
  (req, res) => {
    res.status(201).json({ message: "User Login successfully" });
  }
);

module.exports = router;
