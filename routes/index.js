const express = require("express");
const router = express.Router();

//@desc  login Landing Page
//@routes   GET /login

router.get("/", (req, res) => {
  res.render("login", { layout: "login" });
});
//@desc   dashboard Landing Page
//@routes   GET /Dashboard

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
