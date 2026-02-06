const mongoose = require("mongoose");


/**
 * Modèle Reservation.
 * - catwayNumber : numéro du catway réservé
 * - clientName : nom du client
 * - boatName : nom du bateau
 * - startDate / endDate : dates de réservation
 *
 * @module models/reservationModel
 */

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true },
    clientName: { type: String, required: true, trim: true },
    boatName: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
