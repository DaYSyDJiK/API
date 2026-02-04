const reservationService = require("../services/reservationService");
const catwayService = require("../services/catwayService");

// GET /catways/:id/reservations
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

// GET /catways/:id/reservations/:idReservation
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

// POST /catways/:id/reservations
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

// PUT /catways/:id/reservations
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

// DELETE /catways/:id/reservations/:idReservation
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