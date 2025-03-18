const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au propriétaire
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'France' }
  },
  pricePerNight: { type: Number, required: true }, // Prix par nuit
  surface: { type: Number, required: true }, // En m²
  guests: { type: Number, required: true }, // Nombre max de personnes
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  images: [{ type: String }],
  availability: [{
    startDate: Date,
    endDate: Date
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);