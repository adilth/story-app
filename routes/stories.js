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

//@desc  show all stories
//@routes   GET / stories

router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("User")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc  show single story
//@routes   GET / stories/:id

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate().lean();
    if (!story) {
      return res.status(404).render("error/404");
    }
    res.render("stories/show", { story });
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});
//@desc  show edite page
//@routes   GET / stories/edite/:id
router.get("/edite/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) {
      return res.status(404).render("error/404");
    }
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edite", { story });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc  update story
//@routes   GET / stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("error/404");
    }
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc  Delete
//@routes   DELETE / stories/:id

router.delete("/add", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

//@desc  show full story
//@routes   GET /stories/user/:userId

router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.findOne({
      user: req.params.userId,
      status: "public",
    })
      .populate()
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
