/**
 * Contrôleur REST pour la ressource Reservation (sous-ressource de Catway).
 * @module controllers/reservationController
 */

const reservationService = require("../services/reservationService");
const catwayService = require("../services/catwayService");



/**
 * Liste les réservations d'un catway.
 * @route GET /catways/:id/reservations
 * @function getReservationsByCatway
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Liste JSON des réservations du catway
 */

exports.getReservationsByCatway = async (req, res) => {
  try {
    const catwayNumber = parseInt(req.params.id);
    const catway = await catwayService.getCatwayByNumber(catwayNumber);
    if (!catway) {
      return res.status(404).json({ error: "Catway introuvable" });
    }

    const reservations = await reservationService.getReservationsByCatway(catwayNumber);
    res.json(reservations);
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
};



/**
 * Récupère une réservation par son id Mongo.
 * @route GET /catways/:id/reservations/:idReservation
 * @function getReservationById
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Réservation JSON ou 404
 */

exports.getReservationById = async (req, res) => {
  try {
    const { idReservation } = req.params;
    const reservation = await reservationService.getReservationById(idReservation);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    return res.json(reservation);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Crée une réservation pour un catway donné.
 * Valide la présence des champs et la cohérence des dates.
 * @route POST /catways/:id/reservations
 * @function createReservation
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Réservation créée (201) ou erreur
 */

exports.createReservation = async (req, res) => {
  try {
    const catwayNumber = parseInt(req.params.id);
    const { clientName, boatName, startDate, endDate } = req.body;

    if (!clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: "startDate doit être avant endDate" });
    }

    const catway = await catwayService.getCatwayByNumber(catwayNumber);
    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    const reservation = await reservationService.createReservation({
      catwayNumber,
      clientName,
      boatName,
      startDate: start,
      endDate: end
    });

    return res.status(201).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Met à jour une réservation par son id Mongo.
 * @route PUT /catways/:id/reservations/:idReservation
 * @function updateReservation
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Réservation mise à jour ou 404
 */

exports.updateReservation = async (req, res) => {
  try {
    const { idReservation } = req.params;
    const data = req.body;

    const reservation = await reservationService.updateReservation(idReservation, data);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    return res.json(reservation);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Supprime une réservation par son id Mongo.
 * @route DELETE /catways/:id/reservations/:idReservation
 * @function deleteReservation
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} 204 si supprimée, 404 sinon
 */

exports.deleteReservation = async (req, res) => {
  try {
    const { idReservation } = req.params;
    const reservation = await reservationService.deleteReservation(idReservation);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};