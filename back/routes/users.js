const express = require("express");
const {createUser, updateUser, deleteUser, getUserById} = require("../controllers/users");

const router = express.Router();

router.post("/", createUser)
router.patch("/:userId", updateUser)
router.delete("/:userId", deleteUser)
router.get("/:userId", getUserById)

module.exports = router;