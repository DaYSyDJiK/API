const express = require("express");

// Pour accéder aux req.params.id et a req.params.idReservation dans le controller
const router = express.Router({ mergeParams: true });

const reservationController = require("../controllers/reservationController");


// GET /catways/:id/reservations
router.get('/', reservationController.getReservationsByCatway);

// GET /catways/:id/reservations/:idReservation
router.get("/:idReservation", reservationController.getReservationById);

// POST /catways/:id/reservations
router.post("/", reservationController.createReservation);

// PUT /catways/:id/reservations
router.put("/:idReservation", reservationController.updateReservation);

// DELETE /catways/:id/reservations/:idReservation
router.delete("/:idReservation", reservationController.deleteReservation);

module.exports = router;