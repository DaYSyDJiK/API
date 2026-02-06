/**
 * Service Reservation : couche d'accès aux données (MongoDB via Mongoose).
 * @module services/reservationService
 */

const Reservation = require('../models/reservationModel');



/**
 * Récupère toutes les réservations.
 * @function getAllReservations
 * @returns {Promise<Array<Object>>}
 */

exports.getAllReservations = () => {
  return Reservation.find();
};



/**
 * Récupère toutes les réservations d'un catway.
 * @function getReservationsByCatway
 * @param {number} catwayNumber Numéro de catway
 * @returns {Promise<Array<Object>>}
 */

exports.getReservationsByCatway = (catwayNumber) => {
    return Reservation.find({ catwayNumber});
};



/**
 * Récupère une réservation par son id Mongo.
 * @function getReservationById
 * @param {string} id Id Mongo (ObjectId)
 * @returns {Promise<Object|null>}
 */

exports.getReservationById = (id) => {
    return Reservation.findById(id);
};



/**
 * Crée une réservation.
 * @function createReservation
 * @param {{catwayNumber:number, clientName:string, boatName:string, startDate:Date, endDate:Date}} data
 * @returns {Promise<Object>}
 */

exports.createReservation = (data) => {
    const reservation = new Reservation(data);
    return reservation.save();
};



/**
 * Met à jour une réservation.
 * @function updateReservation
 * @param {string} id Id Mongo (ObjectId)
 * @param {Object} data Données à mettre à jour
 * @returns {Promise<Object|null>}
 */

exports.updateReservation = (id, data) => {
    return Reservation.findByIdAndUpdate(id, data, { new: true });
};



/**
 * Supprime une réservation.
 * @function deleteReservation
 * @param {string} id Id Mongo (ObjectId)
 * @returns {Promise<Object|null>}
 */

exports.deleteReservation = (id) => {
    return Reservation.findByIdAndDelete(id);

};



/**
 * Récupère les réservations en cours (startDate <= now <= endDate).
 * @function getCurrentReservations
 * @async
 * @returns {Promise<Array<Object>>} Réservations triées par date de début
 */

exports.getCurrentReservations = async () => {
  const now = new Date();
  return Reservation.find({
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).sort({ startDate: 1 });
};

