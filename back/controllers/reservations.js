const ReservationsModel = require('../models/reservations');

const createReservation = async (req, res) => {
    const {property, user, owner, startDate, endDate, totalPrice, status} = req.body;

    try {
        const existingReservation = await ReservationsModel.findOne({property, user});

        if (existingReservation) {
            return res.status(400).json({error: 'Vous avez déjà une réservation pour cette annonce.'});
        }

        const reservation = await ReservationsModel.create({
            property,
            user,
            owner,
            startDate,
            endDate,
            totalPrice,
            status,
        })

        res.status(201).json(reservation)
    } catch (e) {
        console.log(e);
    }
}

const getReservationById = async (req, res) => {
    const {reservationId} = req.params;

    try {
        const reservation = await ReservationsModel.findById(reservationId)
        reservation ?
            res.status(200).json(reservation) :
            res.status(404).json({error: 'Aucune reservation trouvé'})
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

const updateReservation = async (req, res) => {
    const {reservationId} = req.params;
    const data = {...req.body};

    try {
        const reservation = await ReservationsModel.findByIdAndUpdate(reservationId, data, {new: true})

        if (!reservation) {
            return res.status(404).json({error: 'Reservation non trouvé'});
        }

        res.status(200).json(reservation);
    } catch (e) {
        res.status(500).json(e)
    }
};

const deleteReservation = async (req, res) => {
    const {reservationId} = req.params;

    try {
        const reservation = await ReservationsModel.findByIdAndDelete(reservationId)

        res.status(200).json(reservation)
    } catch (e) {
        console.error(e)
        res.status(500).json({error: "Erreur lors de la suppression"})
    }
}

module.exports = {
    createReservation,
    getReservationById,
    updateReservation,
    deleteReservation,
}