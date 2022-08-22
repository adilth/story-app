const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

//@desc  login Landing Page
//@routes   GET /login

router.get("/", ensureGuest, async (req, res) => {
  res.render("login", { layout: "login" });
});
//@desc   dashboard Landing Page
//@routes   GET /Dashboard

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id });
    res.render("dashboard", { name: req.user.firstName, stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
