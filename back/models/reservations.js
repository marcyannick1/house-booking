const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Locataire
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Propriétaire du bien
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['En attente', 'Confirmée', 'Annulée'], default: 'En attente' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);