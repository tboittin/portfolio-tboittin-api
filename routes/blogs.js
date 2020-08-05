const express = require("express");
const router = express.Router();

const { checkJwt, checkRole } = require("../controllers/auth");
const {
  getBlogs,
  getBlogById,
  getBlogBySlug,
} = require("../controllers/blogs");

router.get("", getBlogs);
router.get("/:id", getBlogs);
router.get("/s/:slug", getBlogs);

module.exports = router;
