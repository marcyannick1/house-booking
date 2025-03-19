const express = require("express");
const {createReview, getReviewById, updateReview, deleteReview} = require("../controllers/reviews");


const router = express.Router();

router.post("/", createReview)
router.get("/:reviewId", getReviewById)
router.patch("/:reviewId", updateReview)
router.delete("/:reviewId", deleteReview)

module.exports = router;