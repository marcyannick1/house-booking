const express = require("express");
const {createFavorite, getFavoriteById, deleteFavorite} = require("../controllers/favorites");


const router = express.Router();

router.post("/", createFavorite);
router.get("/:favoriteId", getFavoriteById)
router.delete("/:favoriteId", deleteFavorite);

module.exports = router;