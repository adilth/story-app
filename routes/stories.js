const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

//@desc  show Add Page
//@routes   GET / stories add

router.get("/add", ensureAuth, async (req, res) => {
  res.render("stories/add");
});

//@desc  process Add form
//@routes   POST / stories add

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
module.exports = router;
