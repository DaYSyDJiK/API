const catwayService = require("../services/catwayService");

// GET /catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    return res.json(catways);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /catways/:id
exports.getCatwayByNumber = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const catway = await catwayService.getCatwayByNumber(number);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.json(catway);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /catways
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    if (!catwayNumber || !catwayType || !catwayState) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const catway = await catwayService.createCatway({
      catwayNumber,
      catwayType,
      catwayState
    });

    return res.status(201).json(catway);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /catways/:id (modifie seulement l'état)
exports.updateCatwayState = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const { catwayState } = req.body;

    if (!catwayState) {
      return res.status(400).json({ message: "catwayState obligatoire" });
    }

    const catway = await catwayService.updateCatwayState(number, catwayState);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.json(catway);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /catways/:id
exports.deleteCatway = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const catway = await catwayService.deleteCatway(number);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
