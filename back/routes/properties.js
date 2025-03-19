const express = require("express");
const {createProperty, getPropertyById, updateProperty, deleteProperty} = require("../controllers/properties");
const upload = require("../middleware/cloudinaryUpload")

const router = express.Router();

router.post("/", upload.array('files'), createProperty)
router.get("/:propertyId", getPropertyById)
router.patch("/:propertyId", updateProperty)
router.delete("/:propertyId", deleteProperty)

module.exports = router;