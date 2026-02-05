const Reservation = require('../models/reservationModel');


// Toutes les réservations
exports.getAllReservations = () => {
  return Reservation.find();
};


// Toutes les réservations d'un catway
exports.getReservationsByCatway = (catwayNumber) => {
    return Reservation.find({ catwayNumber});
};

// Une réservation précise (par id Mongo)
exports.getReservationById = (id) => {
    return Reservation.findById(id);
};

// Créer une nouvelle réservation
exports.createReservation = (data) => {
    const reservation = new Reservation(data);
    return reservation.save();
};

// Mettre à jour une réservation
exports.updateReservation = (id, data) => {
    return Reservation.findByIdAndUpdate(id, data, { new: true });
};

// Supprimer une réservation
exports.deleteReservation = (id) => {
    return Reservation.findByIdAndDelete(id);

};

// Réservations en cours
exports.getCurrentReservations = async () => {
  const now = new Date();
  return Reservation.find({
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).sort({ startDate: 1 });
};

