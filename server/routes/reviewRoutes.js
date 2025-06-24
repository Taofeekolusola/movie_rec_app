const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { postReview,
    deleteReview
 } = require("../controllers/reviewController");

router.post("/", auth, postReview);
router.delete("/:reviewId", auth, deleteReview);

module.exports = router;