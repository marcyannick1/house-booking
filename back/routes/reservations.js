const express = require("express");
const {
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation
} = require("../controllers/reservations");

const router = express.Router();

router.post("/", createReservation)
router.get("/:reservationId", getReservationById)
router.patch("/:reservationId", updateReservation)
router.delete("/:reservationId", deleteReservation)

module.exports = router;