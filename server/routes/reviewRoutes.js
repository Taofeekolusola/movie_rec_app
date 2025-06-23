const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { postReview } = require("../controllers/reviewController");

router.post("/", auth, postReview);

module.exports = router;