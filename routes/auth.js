const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc google auth callback
//route GET /auth/google/callback

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }, (req, res) => {
    res.redirect("/dashboard");
  })
);

//@desc logout User
//@router /auth/logout

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
